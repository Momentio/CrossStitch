import soundAdd from "./add.mp3";
import soundDrop from "./drop.mp3";
import update from "../update";

export default (crossInfo, mode = true, callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();
      const game = state.game.gValue;
      
      if(crossInfo){
        const sessionData = JSON.parse(JSON.stringify(game.session.data));
        const dataKey = `${crossInfo.indexes.y}/${crossInfo.indexes.x}`;

        if(mode){
          if(!crossInfo.exists){
            sessionData[dataKey] = game.currentColor;
  
            dispatch(
              state.game.session.data.gUpdate(sessionData)
            );
  
            dispatch(
              update(crossInfo.indexes)
            );
  
            callback(true);
  
            new Audio(soundAdd).play();
  
          }else{
            callback(false);
          }

        }else{
          if(crossInfo.exists){
            sessionData[dataKey] = null;
  
            dispatch(
              state.game.session.data.gUpdate(sessionData)
            );
  
            dispatch(
              update(crossInfo.indexes)
            );
  
            callback(true);
  
            new Audio(soundDrop).play();
  
          }else{
            callback(false);
          }
        }

      }else{
        callback(false);
      }
    }
};