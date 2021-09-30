import React from "react";
import SearchBox from "../searchBox/searchBox";
import { Card, CardTitle, CardBody } from "reactstrap";
import "./main.css";

class Main extends React.Component {
  state = {
    url: "",
    urlArray: [],
  };

  handleInputChange = (event) => {
    const url = event.target.value;
    //onsole.log("url " + url) //this console.log can see the onChange of user's input
    this.setState({ urlArray: url.trim().match(/[^\r\n]+/g) });
    //console.log("urlArray: " + this.state.urlArray)
  };

  render() {
    return (
      <div>
        <Card>
          <CardTitle tag="h3">Enter URL below </CardTitle>
          <CardBody>
            <SearchBox
              //  inputURL={this.state.url}
              handleInputChange={this.handleInputChange}
              handleGrab={this.handleGrab}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export { Main as default };