import calcCrossInfoByCoordinates from "../../../middlewares/calcCrossInfoByCoordinates";
import setCross from "../../setCross";
import move from "../../move";

export default (event = new Event()) => {
    return (dispatch, getState)=>{
      const state = getState();
      
      const $canva = document.getElementById("canvas");

      function getTouchCoordinates(event){
        return {
          x: event.targetTouches[0].clientX,
          y: event.targetTouches[0].clientY - 80
        };
      }
      function dispatchAddCrossStitch(event){
        calcCrossInfoByCoordinates(
          getTouchCoordinates(event),
          getState().game.gValue, (info) => {
            dispatch(
              setCross(info, true)
            )
          }
        )
      }

      function dispatchRemoveCrossStitch(event){
        calcCrossInfoByCoordinates(
          getTouchCoordinates(event),
          getState().game.gValue, (info) => {
            dispatch(
              setCross(info, false)
            )
          }
        )
      }
      
      function moveTo(moveEvent){
        const location = state.game.gValue.location;
        const startCoordinates = getTouchCoordinates(event);
        const endCoordinates = getTouchCoordinates(moveEvent);

        dispatch(
          move(
            "fixed",
            {
              x: location.x + (startCoordinates.x - endCoordinates.x),
              y: location.y + (startCoordinates.y - endCoordinates.y),
            }
          )
        );
      }

      if(state.gValue.game.status === "play"){
        calcCrossInfoByCoordinates(
          getTouchCoordinates(event),
          getState().game.gValue,
          (info) => {
            if(info){
              if(getState().game.currentColor.gValue !== null){
                if(!info.exists){
                  dispatchAddCrossStitch(event);
    
                  $canva.addEventListener("touchmove", dispatchAddCrossStitch);
                  $canva.addEventListener("touchstart", () => {
                    $canva.removeEventListener("touchmove", dispatchAddCrossStitch);
                  });
                  $canva.addEventListener("touchend", () => {
                    $canva.removeEventListener("touchmove", dispatchAddCrossStitch);
                  });
                  
                }else{
                  $canva.addEventListener("touchmove", moveTo);
                  $canva.addEventListener("touchstart", () => {
                    $canva.removeEventListener("touchmove", moveTo);
                  });
                  $canva.addEventListener("touchend", () => {
                    $canva.removeEventListener("touchmove", moveTo);
                  });
                }
  
              }else{
                if(info.exists){
                  dispatchRemoveCrossStitch(event);
  
                  $canva.addEventListener("touchmove", dispatchRemoveCrossStitch);
                  $canva.addEventListener("touchstart", () => {
                    $canva.removeEventListener("touchmove", dispatchRemoveCrossStitch);
                  });
  
                }else{
                  $canva.addEventListener("touchmove", moveTo);
                  $canva.addEventListener("touchstart", () => {
                    $canva.removeEventListener("touchmove", moveTo);
                  });
                  $canva.addEventListener("touchend", () => {
                    $canva.removeEventListener("touchmove", moveTo);
                  });
                }
              }
            }
          }
        )
      }
    }
};