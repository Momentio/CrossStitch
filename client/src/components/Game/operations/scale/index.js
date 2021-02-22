import move from "../move";
import render from "../render";

export default (mode, coordinates) => {
    return (dispatch, getState)=>{
      const state = getState();
      let game = state.game.gValue;
      let scale = game.scale;
      
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

      let focusedLocate;

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
              if(coordinates){
                focusedLocate = {
                  x: coordinates.x * newScale - game.canvasSize / 2,
                  y: coordinates.y * newScale - game.canvasSize / 2,
                };
  
                dispatchMove("fixed", focusedLocate);
  
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
              if(coordinates){
                focusedLocate = {
                  x: coordinates.x * newScale - game.canvasSize / 2,
                  y: coordinates.y * newScale - game.canvasSize / 2,
                };

                dispatchMove("fixed", focusedLocate);

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