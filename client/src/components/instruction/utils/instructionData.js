import One from "../assets/one.png";
import Two from "../assets/two.png";
import Three from "../assets/three.png";
import Four from "../assets/four.png";

const instructionData = [
  {
    itemIndex: "0",
    pic: One,
    title: "Step 1",
    desc1:
      "Enter the URLs as shown in the screenshot. Make sure one line one URL",
    desc2: "",
  },
  {
    itemIndex: "1",
    pic: Two,
    title: "Step 2",
    desc1:
      "When all the URLs are ready, click 'Grab Screenshots'. You should see 'Processing. Please wait...'.  \nIf you encounter an error or issue with processing the screenshots, an alert will pop up on your browser. \nDouble check the URLs to make sure they are in the correct format and/or reduce the number of URLs. (It will take a while to process the screenshots if there are too many URLs).",
    desc2: "",
  },

  {
    itemIndex: "2",
    pic: Three,
    title: "Step 3",
    desc1:
      "When all the screenshots have been processed, you will see an alert on your browser window.",
    desc2: "",
  },

  {
    itemIndex: "3",
    pic: Four,
    title: "Step 4",
    desc1:
      "A new 'Download file' button will appear. Click on it to download your zip file.",
    desc2: "",
  },
];

export default instructionData;
