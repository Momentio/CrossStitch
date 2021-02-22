import scale from "../../scale";
import move from "../../move";

export default (event = new Event()) => {
    return (dispatch, getState)=>{
      const state = getState();
      
      let dispatchMove = (mode) => dispatch(
        move(mode)
      );

      if(state.gValue.game.status === "play"){
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
};