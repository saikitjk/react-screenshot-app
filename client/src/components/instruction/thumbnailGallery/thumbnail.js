import React from "react";
import "./thumbnail.css";

export default function thumbnail({ image }) {
  return (
    <div className="thumbnail">
      <img src={image.pic} alt="Instruction Step" />
    </div>
  );
}
