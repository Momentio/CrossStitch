import React from 'react';
import "./index.css";

export default (props) => {
  return (
    <button
      className="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}