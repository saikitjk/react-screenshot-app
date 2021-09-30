import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { FaSyncAlt, FaCameraRetro, FaDownload } from "react-icons/fa";
import "./searchBox.css";

export default function searchBox() {
  return (
    <div>
      <FormGroup>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="ex. https://www.google.com/"
        />
      </FormGroup>

      <div className="text-right">
        <Button color="primary" className="resetBtn" type="submit" id="reset">
          Reset
        </Button>
        <Button
          color="primary"
          className="savetBtn"
          type="submit"
          id="save-btn"
        >
          Grab screenshots
        </Button>
        <Button
          color="primary"
          className="loadBtn"
          type="button"
          id="load-btn"
          disabled
        >
          Processing. Please wait...
        </Button>
        <Button color="primary" className="dlBtn" type="submit" id="download">
          Download File
        </Button>
      </div>
    </div>
  );
}
