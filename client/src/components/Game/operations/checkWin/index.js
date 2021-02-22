import render from "../render";

export default () => {
    return (dispatch, getState)=>{
      const state = getState();
      const game = state.game.gValue;

      if(game.progress >= 100){
        dispatch(
          state.game.scale.gUpdate(1)
        );

        dispatch(
          state.game.location.gUpdate({x: 0, y: 0})
        );

        dispatch(
          state.game.status.gUpdate("win")
        );

        dispatch(
          render()
        );
      }
    }
};