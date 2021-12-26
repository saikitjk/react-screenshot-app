import React from "react";
import "./instruction.css";
import ActiveThumbnailWindow from "./thumbnailGallery/activeThumbnailWindow";
import ThumbnailGrid from "./thumbnailGallery/thumbnailGrid";
import TextArea from "./thumbnailGallery/textArea";
import InstructionData from "./utils/instructionData";

class Instruction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: {},
    };
  }

  componentDidMount() {
    //mount instruction data at the beginning for it to load
    this.setState({ thumbnails: InstructionData });
  }
  render() {
    return (
      <div className="instructionFlexbox-container">
        <div className="flexbox-item-left">
          <ActiveThumbnailWindow />
          <ThumbnailGrid />
        </div>
        <div className="flexbox-item-right">
          <TextArea />
        </div>
      </div>
    );
  }
}

export { Instruction as default };
