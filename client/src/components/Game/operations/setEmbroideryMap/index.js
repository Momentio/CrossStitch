import render from "../render";
import quantization from "../../middlewares/quantization";

export default (callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();
      const mode = state.gValue.mode;
      const game = state.gValue.game;

      const $canva = document.getElementById("canvas");
      const ctx = $canva.getContext('2d');

      const img = new Image();

      img.onload = () => {
        const imageSize = game.session.imageSize;

        ctx.drawImage(
          img,
          (game.canvasSize - imageSize) / 2,
          (game.canvasSize - imageSize) / 2,
          imageSize,
          imageSize,
        );

        const imgData = ctx.getImageData(
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