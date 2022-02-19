// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var cors = require("cors");

// Sets up the Express app to handle data parsing
//const publicPath = path.join(__dirname, "..", "public");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public"));
  });
}

app.post("/api/savescreenshot", async (req, res) => {
  //req carry arrLength,sessID,urlList from frontend
  const { sessID } = req.body;
  const { arrLength } = req.body;
  var concurrenyValue = parseInt(arrLength); //this is for dynamic concyrrency value
  //convert urlList in req.body into an array
  for (var urlArray in req.body) {
    if (req.body.hasOwnProperty("urlArray")) {
      var urlArrayToUse = req.body[urlArray];
    }
  }

  try {
    (async () => {
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER, //To prevent hang
        maxConcurrency: 10, //Set 10 for now, can use concurrentValue for dynamic treshold
        workerCreationDelay: 200, //to prevent max cpu/ network at the start
        monitor: true, //enable stats on the backend for visibility
        timeout: 600000,
        puppeteerOptions: {
          headless: true,
          args: ["--no-sandbox"],
        },
      });

      cluster.on("taskerror", (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
      });

      await cluster.task(async ({ page, data: url, worker }) => {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

        await page.screenshot({
          fullPage: true,
          path: `${sessID}` + "/" + url.replace(/[^a-zA-Z]/g, "_") + ".png",
        });
        console.log(`Screenshot of ${url} saved`);
      });

      //use the urlArray into the cluster queue and create dir
      for (let i = 0; i < urlArrayToUse.length; i++) {
        if (i === 0) {
          fs.mkdir(path.join(__dirname, sessID), (err) => {
            if (err) {
              return console.error("mkdir error: " + err);
            }
            console.log("Directory created successfully!");
          });
        }

        cluster.queue(urlArrayToUse[i]);
      }
      await cluster.idle();
      await cluster.close();

      //***********Find folder and zip it and send ready signal to frontend*************/

      const dir = "./" + sessID; //dir = sessid folder location
      fs.readdir(dir, (err, files) => {
        console.log("File size: " + files.length);
        if (files.length === 0) {
          console.log("No file to zip");
          return res.json({
            err: err,
            readyDl: false,
            msg:
              "No file to zip. Please check URL input or contact the page admin.",
          });
        }
        // if (files.length == urlArrayToUse.length) {
        if (files.length > 0) {
          zipFile(sessID, function (err) {
            if (err) {
              console.log(err); // Check error if you want
              return res.json({
                err: err,
                readyDl: false,
                msg:
                  "Internal server error. Please contact the page administrator.",
              });
            } else {
              return;
            }
          });
          return res.status(200).json({
            readyDl: true,
            msg: "Your file is ready for download!",
            fileSize: files.length,
          });
        }
      });

      //console.log("Completed");
    })();
  } catch (e) {
    // catch errors and send error status
    console.log(e);
    res.sendStatus(500).json({
      err: err,
      readyDl: false,
      msg: "Internal server error. Please contact the page administrator.",
    });
  }
});

app.post("/api/download", function (req, res) {
  // const { test } = req.body;
  console.log("I am triggered");
  const file = __dirname + "/temporary/screenshots.zip";
  //console.log(fs.existsSync(file));
  if (fs.existsSync(file) === false) {
    return res.status(404).json({ msg: "no such file or directory" });
  }
  res.download(file, "screenshots.zip", function (err) {
    if (err) {
      console.log(err); // Check error if you want
      return res.json({ err: err });
    } else {
      fs.unlink(file, function () {
        console.log("File was deleted"); // Callback
      });
    }
  });
});

function zipFile(sessID) {
  let zip = require("node-zip")();

  let zipName = "screenshots.zip"; // This just creates a variable to store the name of the zip file that you want to create
  let someDir = fs.readdirSync(__dirname + "/" + sessID); // read the directory that you would like to zip
  let newZipFolder = zip.folder(sessID); // declare a folder with the same name as the directory you would like to zip (we'll later put the read contents into this folder)

  //append each file in the directory to the declared folder
  for (var i = 0; i < someDir.length; i++) {
    newZipFolder.file(
      someDir[i],
      fs.readFileSync(__dirname + "/" + sessID + "/" + someDir[i]),
      { base64: true }
    );
  }

  let data = zip.generate({ base64: false, compression: "DEFLATE" }); //generate the zip file data
  fs.promises
    .mkdir(__dirname + "/temporary/", { recursive: true })
    .catch(console.error);

  //write the data to file
  fs.writeFile(__dirname + "/temporary/" + zipName, data, "binary", function (
    err
  ) {
    //console.log("1. " + __dirname);
    if (err) {
      console.log("triggered: " + err);
    } else {
      fs.rmdir(__dirname + "/" + sessID, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(
          "Screenshots are zipped and the original image files are deleted!"
        );
      });
    }
  });
  return;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
