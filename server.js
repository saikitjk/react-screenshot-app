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

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  // await page.setViewport({
  //   width: 1400,
  //   height: 1000,
  //   deviceScaleFactor: 1,
  // });
  await page.setViewport({ width: 1200, height: 1200 });
  const screenshot = await page.screenshot({ fullPage: true });

  await browser.close();
  return screenshot;
}

app.post("/api/savescreenshot", async (req, res) => {
  const { url } = req.body;
  const { sessID } = req.body;
  const { count } = req.body;
  const { arrLength } = req.body;

  try {
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
