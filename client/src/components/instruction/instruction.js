import React from "react";
import "./instruction.css";
import ActiveThumbnailWindow from "./thumbnailGallery/activeThumbnailWindow";
import ThumbnailGrid from "./thumbnailGallery/thumbnailGrid";
import TextArea from "./thumbnailGallery/textArea";
import InstructionData from "./utils/instructionData";
import { Row, Container, Col, Button } from "reactstrap";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: [],
      activeIndex: 0,
      instructionDisplayToggle: false,
    };
  }

  componentDidMount() {
    //mount instruction data at the beginning for it to load
    this.setState({ thumbnails: InstructionData });
  }

  renderThumbnails = () => {
    //this is make sure the render starts after the component is loaded
    const { thumbnails, activeIndex } = this.state;
    if (thumbnails.length) {
      return (
        <ActiveThumbnailWindow activeThumbnail={thumbnails[activeIndex]} />
      );
    }
    return null;
  };

  renderText = () => {
    //this is make sure the render starts after the component is loaded
    const { thumbnails, activeIndex } = this.state;
    if (thumbnails.length) {
      return <TextArea activeText={thumbnails[activeIndex]} />;
    }
    return null;
  };

  handleClick = (e) => {
    //console.log("handleClick");
    //get data-index via onclick
    const newActiveIndex = e.target.getAttribute("data-index");
    console.log(newActiveIndex);
    this.setState({ activeIndex: newActiveIndex });
  };

  instructionClick() {
    console.log("clicked");
    this.setState({
      instructionDisplayToggle: !this.state.instructionDisplayToggle, //
    });
    console.log(this.state);
  }

  render() {
    const { thumbnails } = this.state;
    //console.log("here3: " + JSON.stringify(thumbnails[0]));
    return (
      <Container>
        <Row>
          <Col>
            {this.state.instructionDisplayToggle ? (
              <Button
                className="instructionButton"
                onClick={this.instructionClick.bind(this)}
              >
                <FaCaretUp /> Instructions <FaCaretUp />
              </Button>
            ) : (
              <Button
                className="instructionButton"
                onClick={this.instructionClick.bind(this)}
              >
                <FaCaretDown /> Instructions <FaCaretDown />
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          {this.state.instructionDisplayToggle ? (
            <div className="instructionFlexbox-container">
              <div className="flexbox-item-top">
                {this.renderThumbnails()}
                <ThumbnailGrid
                  standbyThumbnails={thumbnails}
                  handleClick={this.handleClick}
                />
              </div>

              <div className="flexbox-item-bottom">{this.renderText()}</div>
            </div>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export { Instruction as default };
