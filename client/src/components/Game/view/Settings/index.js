import React, { Component } from 'react';
import Button from '../../../Button';
import Select from '../../../Select';
import "./index.css";

class Settings extends Component {
  constructor(props){
    super(props);
  };

  updateNumberColors = (value) => {
    this.props.dispatch(
      this.props.gModel.session.numberColors.gUpdate(
        Number(value)
      )
    );
  }

  updateImageSize = (value) => {
    this.props.dispatch(
      this.props.gModel.session.imageSize.gUpdate(
        Number(value)
      )
    );
  }

  start = () => {
    this.props.dispatch(
      this.props.operations.start()
    );
  }
  
  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    const value = this.props.gModel.gValue;
    
    return (
      <section className="game__settings">
        Размер изображения:
        <Select
          value={value.session.imageSize}
          handlerSelect={this.updateImageSize}
        >
          <option value={10}>10</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={600}>600</option>
        </Select>
        Количество цветов:
        <Select
          value={value.session.numberColors}
          handlerSelect={this.updateNumberColors}
        >
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
        </Select>
        <Button onClick={this.start}>Начать игру</Button>
      </section>
    );
  }
}

export default Settings;