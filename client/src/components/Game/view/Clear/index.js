import React, { Component } from 'react';
import "./index.css";

class Clear extends Component {
  constructor(props){
    super(props);
  };

  setCurrentColor = () => {
    this.props.dispatch(
      this.props.operations.setCurrentColor(
        null
      )
    );
  }
  
  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    const value = this.props.gModel.gValue;
    const currentColor = value.currentColor;
    
    return (
      <button
        className={
          `button clear${currentColor === null ? " clear--actived" : ""}`
        }
        onClick={this.setCurrentColor}
      />
    );
  }
}

export default Clear;