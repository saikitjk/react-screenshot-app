# React-Screenshot-App

## Demo

- https://react-screenshot-app.herokuapp.com/

## Overview

This is a web app that helps you crawl multiple screenshots of websites concurrently. It will take the list of URLs you entered and capture theie page in screenshot and zip them into one zip file for you to download.
It has Puppeteer Cluster to keep track of jobs and errors and the size of screenshot and the threshold of maximum concurrency can be customized if needed:

- `maxConcurrency` Maximal number of parallel workers. Defaults to 10.
- `workerCreationDelay` Time between creation of two workers. Default to 200 (0.2 seconds). You can use this to prevent a network peak right at the start.
- `monitor` provides a small command line output to provide information about the crawling process. Default set to true.
- `timeout` Specify a timeout for all tasks. Defaults to 600000ms
- Default screenshot size is set to full page

#

## Available Scripts

**In the project root directory, you can run:**

## `npm install`

- Installs all modules that are listed on package.json file and their dependencies for both frontend and backend and builds the app for production to the `build` folder.

### `npm start`

- Launches the backend server on localhost:3000.

### `nodemon server.js`

- Launches the backend server on localhost:3000 with nodemon.
- The server will restart if you make changes to the backend server.

### `npm run dev`

- Runs both frontend and backend concurrently

#### In the .\client folder, you can run:

### `npm start`

- Runs the frontend in the development mode.\
- Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
- The page will reload if you make edits.

#

## Technology

- HTML
- CSS
- JavaScript
- Node.js
- React
- Reactstrap
- Express.js
- Axios
- puppeteer
- puppeteer-cluster
- HTTP methods
- MVC design
