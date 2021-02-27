import getCrossInfoByCoordinates from "../../middlewares/getCrossInfoByCoordinates";
import getMouseCoordinates from "../../middlewares/getMouseCoordinates";
import getTouchCoordinates from "../../middlewares/getTouchCoordinates";
import setCross from "../setCross";
import move from "../move";
import scale from "../scale";
import adapt from "../adapt";
import render from "../render";

export default () => {
    return (dispatch, getState)=>{
      const action = {
        mode: null,
        downCoordinates: null,
        location: getGameValue().location
      };

      function resetMode(){
        action.mode = null;
      }

      function getGameValue(){
        return getState().game.gValue;
      }

      function getCrossInfo(coordinates){
        return getCrossInfoByCoordinates(coordinates, getGameValue());
      }
      
      function dispatchSetCrossStitch(coordinates, value){
        dispatch(setCross(getCrossInfo(coordinates), value));
      }
      
      function dispatchMove(direction){
        dispatch(
          move(direction)
        );
      }

      function checkGameStatus(){
        return getGameValue().status === "play";
      }

      function downHandler(coordinates){
        const gameValue = getGameValue();

        if(checkGameStatus()){
          const crossInfo = getCrossInfo(coordinates);
          
          if(crossInfo){
            if(gameValue.currentColor !== null){
              if(!crossInfo.exists){
                dispatchSetCrossStitch(coordinates, true);
  
                action.mode = "draw";
                
              }else{
                action.mode = "move";
              }
  
            }else{
              if(crossInfo.exists){
                dispatchSetCrossStitch(coordinates, false);
  
                action.mode = "clear";
  
              }else{
                action.mode = "move";
              }
            }
          }
        }
      }

      function moveHandler(coordinates){
        if(action.mode === "draw"){
          dispatchSetCrossStitch(coordinates, true);
        }

        if(action.mode === "clear"){
          dispatchSetCrossStitch(coordinates, false);
        }

        if(action.mode === "move"){
          if(action.downCoordinates){
            dispatch(
              move(
                "fixed",
                {
                  x: action.location.x + (action.downCoordinates.x - coordinates.x),
                  y: action.location.y + (action.downCoordinates.y - coordinates.y),
                }
              )
            );
          }
        }
      }

      function keyPressHandler(event){
        if(checkGameStatus()){
          if(event.key === "+" || event.key === "-"){
            dispatch(scale(event.key));
            event.preventDefault();
          }
    
          switch(event.keyCode){
            case 37:
              dispatchMove("left");
              event.preventDefault();
            break;
    
            case 38:
              dispatchMove("top");
              event.preventDefault();
            break;
    
            case 39:
              dispatchMove("right");
              event.preventDefault();
            break;
            
            case 40:
              dispatchMove("bottom");
              event.preventDefault();
            break;
          }
        }
      }

      function wheelHandler(event){
        if(checkGameStatus()){
          const crossInfo = getCrossInfo(getMouseCoordinates(event));
  
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
      }

      const $canva = document.getElementById("canvas");

      $canva.addEventListener("mousedown", event => {
        action.location = getGameValue().location;
        action.downCoordinates = getMouseCoordinates(event);
        downHandler(action.downCoordinates);
      });

      $canva.addEventListener("mousemove", event => moveHandler(
        getMouseCoordinates(event)
      ));
      $canva.addEventListener("mouseup", resetMode);
      $canva.addEventListener("mouseout", resetMode);
      
      $canva.addEventListener("touchstart", event => {
        action.location = getGameValue().location;
        action.downCoordinates = getTouchCoordinates(event);
        downHandler(action.downCoordinates);
      });

      $canva.addEventListener("touchend", resetMode);
      $canva.addEventListener("touchmove", event => moveHandler(
        getTouchCoordinates(event)
      ));

      document.body.addEventListener("keydown", keyPressHandler);

      if($canva.addEventListener){
        if('onwheel' in document){
          $canva.addEventListener("wheel", wheelHandler);

        }else if('onmousewheel' in document){
          $canva.addEventListener("mousewheel", wheelHandler);

        }else {
          $canva.addEventListener("MozMousePixelScroll", wheelHandler);
        }

      }else {
        $canva.attachEvent("onmousewheel", wheelHandler);
      }

      document.body.onresize = () => {
        dispatch(
          adapt()
        );
        dispatch(
          render()
        );
      }
    }
};