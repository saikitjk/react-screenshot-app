import React from "react";
import "./activeThumbnailWindow.css";

export default function activeThumbnailWindow({ activeThumbnail }) {
  console.log(activeThumbnail);
  return (
    <div className="activeWindow">
      {" "}
      <img src={activeThumbnail.pic} alt="Instruction Step 1" />
    </div>
  );
}
