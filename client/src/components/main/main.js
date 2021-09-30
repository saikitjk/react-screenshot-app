import React from "react";
import SearchBox from "../searchBox/searchBox";
import { Card, CardTitle, CardBody } from "reactstrap";
import "./main.css";

class Main extends React.Component {
  state = { url: "", urlArray: [] };
  render() {
    return (
      <div>
        <Card>
          <CardTitle>
            <CardBody>
              <SearchBox
                //  inputURL={this.state.url}
                handleInputChange={this.handleInputChange}
                handleGrab={this.handleGrab}
              />
            </CardBody>
          </CardTitle>
        </Card>
      </div>
    );
  }
}

export { Main as default };
