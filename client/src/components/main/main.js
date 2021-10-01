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
    var arrLength = this.state.urlArray.length;
    var urlArray = this.state.urlArray; //variable in handlegrab that takes from state object properties

    //CONSOLE LOG FIELD
    console.log("sessID after hitting the grab button: " + sessID);
    console.log(
      "urlArray in stateObject after hitting grab button: " + urlArray
    );
    console.log("Array length: " + arrLength);
    console.log("print out the state object: " + this.state);
    //CONSOLE LOG FIELD

    function doNext(count = 0) {
      console.log("doNext function is triggered");
    }
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
