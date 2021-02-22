
export default () => {
    return (dispatch, getState)=>{
      const state = getState();
      let sessionModel = state.game.session;
      
      localStorage.setItem("session", "");

      dispatch(
        sessionModel.image.gUpdate(null)
      );

      dispatch(
        sessionModel.data.gUpdate({})
      );

      dispatch(
        sessionModel.numberColors.gUpdate(null)
      );

      dispatch(
        sessionModel.imageSize.gUpdate(null)
      );
    }
};