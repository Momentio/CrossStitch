import React, { Component } from 'react';
import Canvas from './Canvas';
import Colors from './Colors';
import Clear from './Clear';
import Exit from './Exit';
import HttpQuery from '../../HttpQuery';
import Settings from './Settings';
import UploadImage from './UploadImage';
import Progress from './Progress';
import "./index.css";

class Game extends Component {
  constructor(props){
    super(props);
  };

  init = () => {
    this.props.dispatch(
      this.props.operations.init()
    );
  }

  componentDidMount = () => {
    this.init();
  }

  render() {
    if(!this.props.gModel || !this.props.gModel.gValue) return false;

    let value = this.props.gModel.gValue;
    
    if(value.status === "uploadingImage"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <UploadImage {...this.props} />
          </HttpQuery>
        </article>
      );
    }
    
    if(value.status === "configuration"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <Settings {...this.props} />
          </HttpQuery>
        </article>
      );
    }

    if(value.status === "loadingResources"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <b>Загрузка ресурсов...</b>
          </HttpQuery>
        </article>
      );
    }

    if(value.status === "quantization"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <Canvas
              size={this.props.gModel.canvasSize.gValue}
              className="canvas--hidden"
            />
            <b>Подготовка...</b>
          </HttpQuery>
        </article>
      );
    }

    if(value.status === "play"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <div className="game__info">
              <Progress {...this.props}/>
              <Exit {...this.props}/>
            </div>
            <Canvas
              size={this.props.gModel.canvasSize.gValue}
            />
            <div className="game__instruments">
              <Clear {...this.props}/>
              <Colors {...this.props}/>
            </div>
          </HttpQuery>
        </article>
      );
    }

    if(value.status === "win"){
      return (
        <article className="game text-center">
          <HttpQuery gModel={this.props.gModel.httpQuery}>
            <div className="game__info">
              <Exit {...this.props}/>
            </div>
            <Canvas
              size={this.props.gModel.canvasSize.gValue}
            />
          </HttpQuery>
        </article>
      );
    }
    
    return (
      <article className="game text-center">
        <HttpQuery gModel={this.props.gModel.httpQuery}>
          {value.status}
        </HttpQuery>
      </article>
    );
  }
}

export default Game;