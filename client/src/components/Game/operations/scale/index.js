import move from "../move";
import render from "../render";
import calcLocationCenteredCross from "../../middlewares/calcLocationCenteredCross";

export default (mode, crossIndexes) => {
    return (dispatch, getState)=>{
      const state = getState();
      let game = state.game.gValue;
      const {
          canvasSize,
          scale,
          embroideryCoordinates,
          crossSize,
      } = game;
      
      let dispatchUpdateScale = value => {
        dispatch(
          state.game.scale.gUpdate(value)
        )
        dispatch(render());
      };
      
      let dispatchMove = (mode, value) => dispatch(
        move(mode, value)
      );
      
      let newScale;

      const maxScale = 64 / game.crossSize;

      const middleScale = 48 / game.crossSize;

      switch(mode){
        case "+":
          switch(scale){
            case maxScale:
              newScale = maxScale;
            break;

            case middleScale:
              newScale = maxScale;
            break;

            case 1:
              newScale = maxScale;
            break;

            default:
              newScale = 1;
            break;
          }

          if(newScale){
            dispatchUpdateScale(newScale);

            if(newScale === 1){
              dispatchMove(
                "fixed", {x: 0, y: 0}
              );

            }else{
              if(crossIndexes){
                dispatchMove(
                  "fixed",
                  calcLocationCenteredCross(
                    canvasSize,
                    embroideryCoordinates,
                    crossSize,
                    crossIndexes,
                    newScale
                  )
                );
  
              }else{
                dispatchMove(
                  "fixed", {x: 0, y: 0}
                );
              }
            }
          }
        break;

        case "-":
          switch(scale){
            case maxScale:
              newScale = middleScale;
            break;

            case middleScale:
              newScale = 1;
            break;

            default:
              newScale = 1;
            break;
          }

          if(newScale){
            dispatchUpdateScale(newScale);

            if(newScale === 1){
              dispatchMove(
                "fixed", {x: 0, y: 0}
              );

            }else{
              if(crossIndexes){
                dispatchMove(
                  "fixed",
                  calcLocationCenteredCross(
                    canvasSize,
                    embroideryCoordinates,
                    crossSize,
                    crossIndexes,
                    newScale
                  )
                );

              }else{
                dispatchMove(
                  "fixed", {x: 0, y: 0}
                );
              }
            }
          }
        break;
      }
    }
};