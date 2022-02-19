import React from "react";
import { Jumbotron } from "reactstrap";
import "./header.css";

export default function header() {
  return (
    <div>
      <Jumbotron>
        <h1>Screenshot App</h1>
        <h3>Capture screenshot of any website</h3>
        <h6>
          Note: This tool may not be able to capture websites that has CAPTCHAs
          enabled
        </h6>
        <hr></hr>
      </Jumbotron>
    </div>
  );
}
