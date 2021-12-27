import React from "react";
import "./textArea.css";

export default function textArea({ activeText }) {
  return (
    <div className="textArea">
      {activeText.desc1}
      {activeText.desc2}
    </div>
  );
}
