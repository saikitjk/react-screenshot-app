import React from "react";
import "./thumbnail.css";

export default function thumbnail({ image, itemIndex, handleClick }) {
  return (
    <div className="thumbnail">
      <img src={image.pic} alt={itemIndex} onClick={handleClick} />
    </div>
  );
}
