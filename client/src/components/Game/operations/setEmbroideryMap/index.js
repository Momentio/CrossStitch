import render from "../render";
import quantization from "../../middlewares/quantization";

export default (callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();
      let mode = state.gValue.mode;
      let game = state.gValue.game;

      const $canva = document.getElementById("canvas");
      const ctx = $canva.getContext('2d');

      let img = new Image();

      img.onload = () => {
        let imageSize = game.session.imageSize;

        ctx.drawImage(
          img,
          (game.canvasSize - imageSize) / 2,
          (game.canvasSize - imageSize) / 2,
          imageSize,
          imageSize,
        );

        let imgData = ctx.getImageData(
          (game.canvasSize - imageSize) / 2,
          (game.canvasSize - imageSize) / 2,
          imageSize,
          imageSize,
        );

        quantization(
          imgData,
          game.session.numberColors,
          game.session.imageSize,
          10,
          (result) => {
            if(result){

              dispatch(
                state.game.colors.gUpdate(
                  result.mainColors
                )
              );

              dispatch(
                state.game.embroideryMap.gUpdate(
                  result.imgMap
                )
              );
              
              callback();
            }
        });
      }

      if(mode === "presentation"){
        img.src = game.session.image;

      }else if(mode === "combat"){
        img.src = `http://localhost/${game.session.image}`;
      }
    }
};