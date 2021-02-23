import scale from "../../scale";
import calcCrossInfoByCoordinates from "../../../middlewares/calcCrossInfoByCoordinates";

export default (event = new Event()) => {
    return (dispatch, getState)=>{
      const state = getState();

      function getMouseCoordinates(event){
        return {
          x: event.nativeEvent ? event.nativeEvent.offsetX : event.offsetX,
          y: event.nativeEvent ? event.nativeEvent.offsetY : event.offsetY
        };
      }

      if(state.gValue.game.status === "play"){
        calcCrossInfoByCoordinates(
          getMouseCoordinates(event),
          getState().game.gValue,
          crossInfo => {
            if(crossInfo){
              dispatch(
                scale(
                  event.deltaY > 0 ? "-" : "+",
                  crossInfo.indexes
                )
              );
  
            }else{
              dispatch(
                scale(event.deltaY > 0 ? "-" : "+",)
              );
            }
  
            event.preventDefault();
          }
        )
      }
    }
};