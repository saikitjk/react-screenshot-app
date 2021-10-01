import React from "react";
import SearchBox from "../searchBox/searchBox";
import { Card, CardTitle, CardBody } from "reactstrap";
import "./main.css";

class Main extends React.Component {
  state = {
    url: "",
    urlArray: [],
  };

  //input box in searchBox
  handleInputChange = (event) => {
    const url = event.target.value;
    //onsole.log("url " + url) //this console.log can see the onChange of user's input
    this.setState({ urlArray: url.trim().match(/[^\r\n]+/g) });
    //console.log("urlArray: " + this.state.urlArray)
  };

  //submit button
  handleGrab = (event) => {
    event.preventDefault();
    //generate random sessID
    let ranGen = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    var sessID = ranGen();
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
