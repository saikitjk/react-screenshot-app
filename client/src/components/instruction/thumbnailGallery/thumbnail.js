import React from "react";
import "./thumbnail.css";

export default function thumbnail({ image, itemIndex }) {
  return (
    <div className="thumbnail">
      <img src={image.pic} alt={itemIndex} />
    </div>
  );
}
