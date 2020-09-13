// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var puppeteer = require("puppeteer")


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});





app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body

  try {
    let screenshot = await takeScreenshot(url)
    let img = screenshot.toString('base64')
    res.send({ result: img })
  } catch (e) {
    // catch errors and send error status
    console.log(e);
    res.sendStatus(500);
  }
});

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.setViewport({
    width: 1400,
    height: 1000,
    deviceScaleFactor: 1,
  });
  const screenshot = await page.screenshot()

  await browser.close();
  return screenshot;
}



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
