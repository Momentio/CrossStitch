import React, { Component } from 'react';
import "./index.css";

class Colors extends Component {
  constructor(props){
    super(props);
  };

  setCurrentColor = (color) => {
    this.props.dispatch(
      this.props.operations.setCurrentColor(
        color
      )
    );
  }
  
  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    const value = this.props.gModel.gValue;
    const currentColor = value.currentColor || [];
    
    return (
      <ul className="colors">
        {
          value.colors.map((colors, i) => {
            return (
              <li
                className={
                  `colors__item${
                    currentColor.join() === colors.value.join() ? " colors__item--active" : ""
                  }`
                }
                onClick={() => this.setCurrentColor(colors.value)}
                style={{
                  background: `rgba(${colors.value.join(",")})`
                }}
                key={i}
              >
                <p className="colors__item-text">{colors.name}</p>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Colors;