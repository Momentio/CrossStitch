import React from 'react';
import "./index.css";

export default (props) => {
  return (
    <canvas
      id="canvas"
      width={`${props.size}px`}
      height={`${props.size}px`}
      className={`canvas${props.className ? " " + props.className : ""}`}
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    />
  );
}