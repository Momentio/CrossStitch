import React from 'react';
import "./index.css";

export default (props) => {
  return (
    <input
      className="input"
      type={props.type}
      value={props.value}
      id={props.id}
      name={props.name}
      onChange={props.onChangeHandler}
    />
  );
}