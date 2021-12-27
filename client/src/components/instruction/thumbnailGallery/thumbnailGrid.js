import React from "react";
import "./thumbnailGrid.css";
import Thumbnail from "./thumbnail";

export default function thumbnailGrid(standbyThumbnails, handleClick) {
  console.log(standbyThumbnails); //check prop
  return (
    <div className="thumbnailGrid">
      {standbyThumbnails.map((thumbnailItem, i) => {
        return (
          <Thumbnail
            key={thumbnailItem.pic}
            image={thumbnailItem}
            itemIndex={i}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
