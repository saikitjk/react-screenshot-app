import One from "../assets/one.png";
import Two from "../assets/two.pmg";
import Three from "../assets/three.png";
import Four from "../assets/four.png";

const instructionData = [
  {
    pic: One,
    desc1: "Enter the URLs as shown in the screenshot",
    desc2: "IMPORTANT: URL must include https and end with a forward slash (/)",
  },
  {
    pic: Two,
    desc1:
      "When all the URLs are ready, click 'Grab Screenshots'. You should see 'Processing. Please wait...'",
    desc2:
      "If you encounter an error or issue with processing the screenshots, an alert will pop up on your browser. Double check the URLs to make sure they are in the correct format and/or reduce the number of URLs. (It will take a while to process the screenshots if there are too many URLs).",
  },

  {
    pic: Three,
    desc1:
      "When all the screenshots have been processed, you will see an alert on your browser window",
    desc2: "",
  },

  {
    pic: Four,
    desc1:
      "A new 'Download file' button will appear. Click on it to download your zip file",
    desc2: "",
  },
];

export default instructionData;
