import calcCrossInfoByCoordinates from "../../../middlewares/calcCrossInfoByCoordinates";
import setCross from "../../setCross";
import move from "../../move";

export default (event = new Event()) => {
    return (dispatch, getState)=>{
      const state = getState();
      
      const $canva = document.getElementById("canvas");

      function getMouseCoordinates(event){
        return {
          x: event.nativeEvent ? event.nativeEvent.offsetX : event.offsetX,
          y: event.nativeEvent ? event.nativeEvent.offsetY : event.offsetY
        };
      }
      
      function dispatchAddCrossStitch(event){
        calcCrossInfoByCoordinates(
          getMouseCoordinates(event),
          getState().game.gValue, (info) => {
            dispatch(
              setCross(info, true)
            )
          }
        )
      }

      function dispatchRemoveCrossStitch(event){
        calcCrossInfoByCoordinates(
          getMouseCoordinates(event),
          getState().game.gValue, (info) => {
            dispatch(
              setCross(info, false)
            )
          }
        )
      }
      
      function moveTo(moveEvent){
        let location = state.game.gValue.location;
        let startCoordinates = getMouseCoordinates(event);
        let endCoordinates = getMouseCoordinates(moveEvent);

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
          getMouseCoordinates(event),
          getState().game.gValue,
          (info) => {
            if(info){
              if(getState().game.currentColor.gValue !== null){
                if(!info.exists){
                  dispatchAddCrossStitch(event);
    
                  $canva.addEventListener("mousemove", dispatchAddCrossStitch);
                  $canva.addEventListener("mouseup", () => {
                    $canva.removeEventListener("mousemove", dispatchAddCrossStitch);
                  });
                  $canva.addEventListener("mouseout", () => {
                    $canva.removeEventListener("mousemove", dispatchAddCrossStitch);
                  });
                  
                }else{
                  $canva.addEventListener("mousemove", moveTo);
                  $canva.addEventListener("mouseup", () => {
                    $canva.removeEventListener("mousemove", moveTo);
                  });
                  $canva.addEventListener("mouseout", () => {
                    $canva.removeEventListener("mousemove", moveTo);
                  });
                }
  
              }else{
                if(info.exists){
                  dispatchRemoveCrossStitch(event);
  
                  $canva.addEventListener("mousemove", dispatchRemoveCrossStitch);
                  $canva.addEventListener("mouseup", () => {
                    $canva.removeEventListener("mousemove", dispatchRemoveCrossStitch);
                  });
  
                }else{
                  $canva.addEventListener("mousemove", moveTo);
                  $canva.addEventListener("mouseup", () => {
                    $canva.removeEventListener("mousemove", moveTo);
                  });
                  $canva.addEventListener("mouseout", () => {
                    $canva.removeEventListener("mousemove", moveTo);
                  });
                }
              }
            }
          }
        )
      }
    }
};