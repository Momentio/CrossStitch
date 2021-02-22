import React, { Component } from 'react';
import Input from '../../../Input';

class UploadImage extends Component {
  constructor(props){
    super(props);
  };

  uploadImage = (e) => {
    this.props.dispatch(
      this.props.operations.uploadImage(
        e.target.files[0]
      )
    );
  }

  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    const value = this.props.gModel.gValue;
    
    return (
      <form id="form">
        <Input type="file" id="myfile" onChangeHandler = {this.uploadImage}/>
        <label htmlFor="myfile">Загрузить изображение</label>
      </form>
    );
  }
}

export default UploadImage;