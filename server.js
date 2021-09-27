// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;
var cors = require("cors");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/src"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/savescreenshot", async (req, res) => {
  //req carry arrLength,sessID,urlList from frontend
  const { sessID } = req.body;
  const { arrLength } = req.body;
  var concurrenyValue = parseInt(arrLength); //this is for dynamic concyrrency value
  //convert urlList in req.body into an array
  for (var urlList in req.body) {
    if (req.body.hasOwnProperty("urlList")) {
      var urlArray = req.body[urlList];
    }
  }

  console.log("The amount of URLs: " + urlArray.length);

  try {
    async () => {
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER, //To prevent hang
        maxConcurrency: 10, //Set 10 for now, can use concurrentValue for dynamic treshold
        workerCreationDelay: 200, //to prevent max cpu at the start
        monitor: true, //enable stats on the backend for visibility
        headless: true,
        timeout: 600000,
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
      for (let i = 0; i < urlArray.length; i++) {
        if (i === 0) {
          fs.mkdir(path.join(__dirname, sessID), (err) => {
            if (err) {
              return console.error("mkdir error: " + err);
            }
            console.log("Directory created successfully!");
          });
        }

        cluster.queue(urlArray[i]);
      }
      await cluster.idle();
      await cluster.close();
    };
    res.sendStatus(200);
  } catch (e) {
    // catch errors and send error status
    console.log(e);
    res.sendStatus(500);
  }
});

app.get("/api/download", function (req, res) {
  // var result = req.body.data
  // console.log("result"+result)
  const file = __dirname + "/temp/screenshots.zip";
  res.download(file, "screenshots.zip", function (err) {
    if (err) {
      console.log(err); // Check error if you want
    } else {
      fs.unlink(file, function () {
        console.log("File was deleted"); // Callback
      });
    }
  }); // Set disposition and send it.
  // res.download(path.join(__dirname, "/" + result + "/screenshots.zip"))
  // res.download("../" + "0098" + '/screenshots.zip', function(error){
  //     console.log("Error : ", error)
  // });
});

// async function saveScreenshot(url, sessID, count) {
//   console.log(sessID);
//   if (count == 0) {
//     fs.mkdir(path.join(__dirname, sessID), (err) => {
//       if (err) {
//         return console.error(err);
//       }
//       console.log("Directory created successfully!");
//     });
//   }
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox"],
//   });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: "networkidle0" });
//   // await page.setViewport({
//   //   width: 1400,
//   //   height: 1000,
//   //   deviceScaleFactor: 1,
//   // });
//   // await page.setViewport({ width: 1200, height: 1200 });
//   await page.screenshot({
//     fullPage: true,
//     path: sessID + "/" + count + ".png",
//   });
//   // const screenshot = await page.screenshot({ path: folder + '/' + count + '.png', fullPage: true })

//   await browser.close();
//   // count++
//   // return count
// }

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

  //write the data to file
  fs.writeFile(__dirname + "/temp/" + zipName, data, "binary", function (err) {
    if (err) {
      console.log("triggered: " + err);
    } else {
      fs.rmdir(__dirname + "/" + sessID, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(`${someDir} is deleted!`);
      });
    }
  });
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
