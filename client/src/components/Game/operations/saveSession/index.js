
export default () => {
    return (dispatch, getState)=>{
      const state = getState();
      const storage = localStorage;
      const sessionModel = state.game.session;
      const sessionValue = sessionModel.gValue;

      const newValue = {
        image: sessionValue.image,
        imageSize: sessionValue.imageSize,
        numberColors: sessionValue.numberColors,
        data: sessionValue.data
      };
      
      storage.setItem("session", JSON.stringify(newValue));
    }
};