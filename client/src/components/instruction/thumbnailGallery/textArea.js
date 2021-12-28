import React from "react";
import "./textArea.css";
import { Media } from "reactstrap";

export default function textArea({ activeText }) {
  return (
    <Media>
      <Media body>
        <Media heading tag="h5">
          {activeText.title}
        </Media>
        {activeText.desc1}

        {activeText.desc2}
      </Media>
    </Media>
  );
}
