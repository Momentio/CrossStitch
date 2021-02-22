import React, { Component, PureComponent } from 'react';
import "./index.css";

class Select extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isShow: false,
    };
  }

  toggle = () => {
    this.setState({isShow: !this.state.isShow});
  }

  render() {
    let options = {};

    if(this.props.children){
      if(this.props.children.length){
        this.props.children.forEach(
          option => {
            options[option.props.value] = option.props.children;
          }
        );

      }else{
        options[this.props.children.props.value] = this.props.children.props.children;
      }
    }

    let value = options[this.props.value] || "-";
    
    return (
      <div 
        className={
          (this.state.isShow) ? `select select--show` : `select`
          + `${this.props.className ? " " + this.props.className : ""}`
        }
      >
        <div
          className="select__value"
          title={value}
          onClick={this.toggle}
        >
          {value}
        </div>
        <div className="select__container">
          <ul className="select__list">
            {
              Object.keys(options).map((key, index) => {
                let name = String(options[key]);

                return (
                  <li
                    className="select__item"
                    title={name}
                    onClick={(e) => {
                      if(this.props.handlerSelect){
                        this.props.handlerSelect(key);
                      }

                      this.toggle();
                    }}
                    key={index}
                  >
                    {name}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
 
export default Select;