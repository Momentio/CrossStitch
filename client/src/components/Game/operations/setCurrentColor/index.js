import render from "../render";

export default (color) => {
    return (dispatch, getState)=>{
      const state = getState();

      dispatch(
        state.game.currentColor.gUpdate(
          color
        )
      );

      dispatch(
        render()
      );
    }
};