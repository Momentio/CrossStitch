import React, { Component } from 'react';
import "./index.css";

class Exit extends Component {
  constructor(props){
    super(props);
  };

  exit = () => {
    this.props.dispatch(
      this.props.operations.exit()
    );
  }
  
  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;
    
    return (
      <button
        className="button exit"
        onDoubleClick={this.exit}
      />
    );
  }
}

export default Exit;