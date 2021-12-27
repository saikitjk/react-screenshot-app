import React from "react";
import "./instruction.css";
import ActiveThumbnailWindow from "./thumbnailGallery/activeThumbnailWindow";
import ThumbnailGrid from "./thumbnailGallery/thumbnailGrid";
import TextArea from "./thumbnailGallery/textArea";
import InstructionData from "./utils/instructionData";
import { Row, Container, Col } from "reactstrap";

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: {},
      activeIndex: 0,
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

  handleClick = (e) => {
    //console.log("handleClick");
    const newActiveIndex = e.target.getAttribute("data-index");
    console.log(newActiveIndex);
    this.setState({ activeIndex: newActiveIndex });
  };

  render() {
    const { thumbnails } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h4 className="instructionTitle">Instructions</h4>
          </Col>
        </Row>
        <Row>
          <div className="instructionFlexbox-container">
            <div className="flexbox-item-left">
              {this.renderThumbnails}
              <ThumbnailGrid
                standbyThumbnails={thumbnails}
                handleClick={this.handleClick}
              />
            </div>
            <div className="flexbox-item-right">
              <TextArea />
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export { Instruction as default };
