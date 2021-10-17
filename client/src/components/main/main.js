import React from "react";
import SearchBox from "../searchBox/searchBox";
import { Card, CardTitle, CardBody } from "reactstrap";
import axios from "axios";
import "./main.css";

class Main extends React.Component {
  state = {
    url: "",
    urlArray: [],
    loadingBtnShow: false,
    downloadBtnShow: false,
  };

  //////////////////////////////////////
  /////////Button Control///////////////
  enabledLoadingBtn = () => {
    this.setState({ loadingBtnShow: true });
    console.log("Loading Btn enabled.");
  };

  disabledLoadingBtn = () => {
    this.setState({ loadingBtnShow: false });
    console.log("Loading Btn enabled.");
  };

  enabledDownloadBtn = () => {
    this.setState({ downloadBtnShow: true });
    console.log("Download Btn enabled.");
  };

  disabledDownloadBtn = () => {
    this.setState({ downloadBtnShow: false });
    console.log("Download Btn disabled.");
  };

  /////////Button Control///////////////
  //////////////////////////////////////

  //input box in searchBox
  handleInputChange = (event) => {
    const url = event.target.value;
    //onsole.log("url " + url) //this console.log can see the onChange of user's input
    this.setState({ urlArray: url.trim().match(/[^\r\n]+/g) });
  };

  //submit button
  handleGrab = (event) => {
    const that = this; // this is to keep the scopt of this.state
    that.enabledLoadingBtn();
    event.preventDefault();
    ///////GENERATE SESSID FUNCTION /////////////
    let ranGen = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    ///////GENERATE SESSID FUNCTION /////////////

    var sessID = ranGen();
    var arrLength = this.state.urlArray.length;
    var urlArray = this.state.urlArray; //variable in handlegrab that takes from state object properties

    //CONSOLE LOG FIELD
    console.log("sessID after hitting the grab button: " + sessID);
    console.log(
      "urlArray in stateObject after hitting grab button: " + urlArray
    );
    console.log("Array length: " + arrLength);
    //CONSOLE LOG FIELD

    function doNext(count = 0) {
      console.log("doNext function is triggered");
      if (count < 1) {
        axios
          .request({
            method: "POST",
            url: "http://localhost:3001/api/savescreenshot",
            header: { "Content-Type": "x-www-form-urlencoded" },
            data: {
              arrLength: arrLength,
              sessID: sessID,
              urlArray: urlArray,
            },
          })
          .then((res) => {
            //receive server response here
            // console.log("response from server: " + JSON.stringify(res));
            // console.log("res.data: " + res.data);

            if (res.data === true) {
              //makes below buttons show and hide
              that.disabledLoadingBtn();
              that.enabledDownloadBtn();
              // $("#load-btn").hide()
              // $("#save-btn").show()
              // $("#download").show()
              alert("your file is ready for download!");
            } else {
              console.log("something wrong");
            }
          });
        //   .fail(function (xhr, status, error) {
        //     console.log("xhr" + JSON.stringify(xhr));
        //     console.log("status" + status);
        //     console.log("error" + error);
        //     // error handling
        //     //   $("#load-btn").hide()
        //     //   $("#save-btn").show()
        //     alert(
        //       "Please check the URL(s) you've entered and make sure the requirements are met. \n\n Requirements: \n\n  1. Make sure URL is formatted correct (ex. https://www.google.com/ )\n 2. Only 1 URL per line in textbox"
        //     );
        //   });
        count++;
      }
    }

    if (arrLength > 0) {
      //make sure urlArray has URL before doNext is triggered
      doNext();
    }
  };

  render() {
    console.log("What is in the state object: " + this.state);
    return (
      <div>
        <Card>
          <CardTitle tag="h3">Enter URL below </CardTitle>
          <CardBody>
            <SearchBox
              //  inputURL={this.state.url}
              handleInputChange={this.handleInputChange}
              handleGrab={this.handleGrab}
              loadingBtnShow={this.state.loadingBtnShow}
              downloadBtnShow={this.state.downloadBtnShow}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export { Main as default };
