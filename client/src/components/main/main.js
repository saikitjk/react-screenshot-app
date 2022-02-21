import React from "react";
import SearchBox from "../searchBox/searchBox";
import Notification from "../notification/notification";
import { Card, CardTitle, CardBody } from "reactstrap";
import axios from "axios";
import isURL from "validator/lib/isURL";
import "./main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      urlArray: [],
      submitBtnShow: true,
      loadingBtnShow: false,
      downloadBtnShow: false,
      displayInfoMsg: false,
      displayErrorMsg: false,
      msg: "",
    };
  }

  //////////////////////////////////////
  /////////Button Control///////////////
  enableBtn = (btnProperty) => {
    this.setState({ [btnProperty]: true }); //[] is dynamic key
    console.log(`${JSON.stringify(btnProperty)}. Btn is enabled!`);
  };

  disableBtn = (btnProperty) => {
    this.setState({ [btnProperty]: false }); //[] is dymanic key
    console.log(`${JSON.stringify(btnProperty)}. Btn is disabled!`);
  };

  /////////Button Control///////////////
  //////////////////////////////////////

  //////////////////////////////////////
  ////////////////Display Msg///////////
  displayDownloadMsg = (msg) => {
    console.log("displayDownloadMsg method called");
    this.setState({ displayInfoMsg: true });
    this.setState({ msg: msg });
  };

  displayErrorMsg = (msg) => {
    console.log("displayErrorMsg method called");
    this.setState({ displayErrorMsg: true });
    this.setState({ msg: msg });
  };

  closeDownloadMsg = () => {
    console.log("Info box closed");
    this.setState({ displayInfoMsg: false });
  };

  closeErrorMsg = () => {
    console.log("Error box closed");
    this.setState({ displayErrorMsg: false });
  };
  ////////////////Display Msg///////////
  //////////////////////////////////////

  //input box in searchBox
  handleInputChange = (event) => {
    const url = event.target.value;
    //onsole.log("url " + url) //this console.log can see the onChange of user's input
    this.setState({ urlArray: url.trim().match(/[^\r\n]+/g) });
  };

  //submit button
  handleGrab = (event) => {
    event.preventDefault();
    const that = this; // this is to keep the scopt of this.state
    that.closeErrorMsg();
    that.closeDownloadMsg();
    ///////GENERATE SESSID FUNCTION /////////////
    let ranGen = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    ///////GENERATE SESSID FUNCTION /////////////

    var sessID = ranGen();
    var urlArrayRaw = this.state.urlArray; //variable in handlegrab that takes from state object properties
    if (urlArrayRaw === null) {
      var arrLength = 0;
    } else {
      arrLength = urlArrayRaw.length;
    }
    //CONSOLE LOG FIELD
    console.log("sessID after hitting the grab button: " + sessID);
    console.log(
      "urlArray in stateObject after hitting grab button: " + urlArrayRaw
    );
    console.log("Array length: " + arrLength);

    //CONSOLE LOG FIELD

    function doNext(count = 0) {
      console.log("doNext function is triggered");
      if (count < 1) {
        axios
          .request({
            method: "POST",
            url: "/api/savescreenshot",
            header: { "Content-Type": "x-www-form-urlencoded" },
            data: {
              arrLength: arrLength,
              sessID: sessID,
              urlArray: urlArray,
            },
          })
          .then((res) => {
            //RECEIVE SERVER DATA HERE
            // console.log("response from server: " + JSON.stringify(res));
            // console.log("res.data: " + res.data);
            const { readyDl } = res.data; //Object destructuring
            const { msg } = res.data; //Object destructuring
            const { err } = res.data; //Object destructuring
            const { fileSize } = res.data;
            //console.log("Value of readyDl: "+readyDl);
            if (readyDl === true) {
              //makes below buttons show and hide
              that.disableBtn("loadingBtnShow");
              that.enableBtn("submitBtnShow");
              that.enableBtn("downloadBtnShow");
              console.log(msg);
              that.displayDownloadMsg(
                `${msg}  Captured:(${fileSize}/${arrLength})`
              );
            }

            if (readyDl === false) {
              console.log("something wrong: " + err);
              that.disableBtn("loadingBtnShow");
              that.enableBtn("submitBtnShow");
              that.displayErrorMsg(msg);
            }
          })
          .catch((error) => {
            console.log("Error in doNext function" + error);
            that.displayErrorMsg(
              "Sorry! Something went wrong. Please contact the page administrator'"
            );
          });
        count++;
      }
    }
    if (arrLength < 1) {
      that.closeErrorMsg();
      that.closeDownloadMsg();
      that.displayErrorMsg("Please enter at least 1 URL");
    }

    if (arrLength > 0) {
      //Input Validation
      var urlArray = [];
      for (let i = 0; i < urlArrayRaw.length; ) {
        if (
          isURL(urlArrayRaw[i], {
            protocols: ["http", "https"],
            require_protocol: false, //this check if input has protocol, set to false to allow user enter url without https://
            require_tld: true,
          })
        ) {
          urlArray.push(urlArrayRaw[i].toLowerCase()); //convert all element in urlArrayRaw to lowercase
          //check if they have https:// and add / at the end
          if (urlArray[i].indexOf("https://") === -1) {
            urlArray[i] = "https://" + urlArray[i] + "/";
            console.log(urlArray[i]);

            i++;
          }
        } else {
          console.log(urlArrayRaw[i] + " is not an valid URL");
          that.displayErrorMsg(
            urlArrayRaw[i] +
              " does not meet the URL requirements. Please see instructions below"
          );
          return;
        }
      }
      that.closeErrorMsg();
      that.closeDownloadMsg();
      that.enableBtn("loadingBtnShow");
      that.disableBtn("submitBtnShow");
      //make sure urlArray has URL before doNext is triggered
      doNext();
    }
  };
  //download button
  handleDl = () => {
    const that = this;
    const result = true;

    const url = "/api/download";
    const requestOptions = {
      method: "POST",
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
      },

      data: {
        test: result,
      },
    };

    function downloadFile() {
      fetch(url, requestOptions)
        .then((res) => res.blob())
        .then((myblob) => {
          console.log("what is in res.data: " + JSON.stringify(myblob));

          const downloadUrl = window.URL.createObjectURL(new Blob([myblob]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", "screenshots.zip");
          document.body.appendChild(link);
          link.click();
          link.remove();
          that.disableBtn("downloadBtnShow");
        })
        .catch((err) => {
          console.log("downloadFile error: " + err);
          that.displayErrorMsg(
            "Sorry! Something went wrong. Please contact the page administrator"
          );
        });
    }

    downloadFile();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Card>
          <CardTitle tag="h3">Enter URL below </CardTitle>
          <CardBody>
            <Notification
              displayInfoMsg={this.state.displayInfoMsg}
              displayErrorMsg={this.state.displayErrorMsg}
              message={this.state.msg}
              closeDownloadMsg={this.closeDownloadMsg}
              closeErrorMsg={this.closeErrorMsg}
            />
            <SearchBox
              //  inputURL={this.state.url}
              handleInputChange={this.handleInputChange.bind(this)}
              handleGrab={this.handleGrab.bind(this)}
              submitBtnShow={this.state.submitBtnShow}
              loadingBtnShow={this.state.loadingBtnShow}
              downloadBtnShow={this.state.downloadBtnShow}
              handleDl={this.handleDl.bind(this)}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export { Main as default };
