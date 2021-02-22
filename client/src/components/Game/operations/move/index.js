import render from "../render";

export default (mode, value = {x: undefined, y: undefined}) => {
    return (dispatch, getState)=>{
      const state = getState();
      let game = state.game.gValue;

      let location = game.location;
      
      let updateLocation = value => {
        dispatch(
          state.game.location.gUpdate(value)
        )
        
        dispatch(render());
      };
      
      let minLocation = 0;
      let maxLocation = game.canvasSize * (game.scale - 1);
      
      let step = {
        x: value.x !== undefined ? value.x : game.crossSize * game.scale,
        y: value.y !== undefined ? value.y : game.crossSize * game.scale,
      };

      let newValue;

      switch(mode){
        case "left":
          if(location.x - step.x >= minLocation){
            newValue = {
              x: location.x - step.x,
              y: location.y,
            };
          }
        break;

        case "top":
          if(location.y - step.x >= minLocation){
            newValue = {
              x: location.x,
              y: location.y - step.y,
            };
          }
        break;

        case "right":
          if(location.x + step.x <= maxLocation){
            newValue = {
              x: location.x + step.x,
              y: location.y,
            };
          }
        break;

        case "bottom":
          if(location.y + step.x <= maxLocation){
            newValue = {
              x: location.x,
              y: location.y + step.y,
            };
          }
        break;

        case "fixed":
          newValue = {
            x: value.x,
            y: value.y
          };

          if(value.x <= minLocation){
            newValue.x = minLocation;
          }

          if(value.x >= maxLocation){
            newValue.x = maxLocation;
          }

          if(value.y <= minLocation){
            newValue.y = minLocation;
          }

          if(value.y >= maxLocation){
            newValue.y = maxLocation;
          }
        break;
      }

      if(newValue){
        updateLocation(newValue);
      }
    }
};