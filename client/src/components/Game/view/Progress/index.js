import React, { Component } from 'react';
import "./index.css";

class Progress extends Component {
  constructor(props){
    super(props);
  };

  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    const value = this.props.gModel.gValue;
    const progress = value.progress;
    
    return (
      <p className="progress">{String(progress).substr(0, 4)}%</p>
    );
  }
}

export default Progress;