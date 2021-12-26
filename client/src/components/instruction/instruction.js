import React from "react";
import "./instruction.css";
import ActiveThumbnailWindow from "./thumbnailGallery/activeThumbnailWindow";
import ThumbnailGrid from "./thumbnailGallery/thumbnailGrid";
import TextArea from "./thumbnailGallery/textArea";

class Instruction extends React.Component {
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
