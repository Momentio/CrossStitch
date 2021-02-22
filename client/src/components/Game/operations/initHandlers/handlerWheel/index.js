import scale from "../../scale";
import calcCrossInfoByCoordinates from "../../../middlewares/calcCrossInfoByCoordinates";

export default (event = new Event()) => {
    return (dispatch, getState)=>{
      const state = getState();

      if(state.gValue.game.status === "play"){
        calcCrossInfoByCoordinates(
          event,
          getState().game.gValue,
          crossInfo => {
            if(crossInfo){
              dispatch(
                scale(
                  event.deltaY > 0 ? "-" : "+",
                  crossInfo.absoluteCoordinates
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