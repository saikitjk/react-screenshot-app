import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { FaSyncAlt, FaCameraRetro, FaDownload } from "react-icons/fa";
import "./searchBox.css";

export default function searchBox(props) {
  return (
    <div>
      <FormGroup>
        <Input
          onChange={props.handleInputChange}
          value={props.inputValue}
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="ex. https://www.google.com/"
        />
      </FormGroup>

      <div className="text-right">
        {/* reset button */}
        <Button
          onClick={props.handleReset}
          color="primary"
          className="resetBtn"
          type="submit"
          id="reset"
        >
          <FaSyncAlt />
          Reset
        </Button>

        {/* submitt button */}
        <Button
          onClick={props.handleGrab}
          color="primary"
          className="savetBtn"
          type="submit"
          id="save-btn"
        >
          <FaCameraRetro />
          Grab screenshots
        </Button>

        {/* loading button */}
        <Button
          color="primary"
          className="loadBtn"
          type="button"
          id="load-btn"
          disabled
        >
          Processing. Please wait...
        </Button>

        {/* download button */}
        <Button
          onClick={props.handleDL}
          color="primary"
          className="dlBtn"
          type="submit"
          id="download"
        >
          <FaDownload />
          Download File
        </Button>
      </div>
    </div>
  );
}
