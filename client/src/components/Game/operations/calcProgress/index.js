
export default () => {
    return (dispatch, getState)=>{
      const state = getState();
      const game = state.game.gValue;
      const data = game.session.data;
      const numberCrosses = game.session.imageSize ** 2;
      
      let numberTrueCrosses = 0;

      Object.keys(data || {}).forEach(key => {
        const yi = +key.split("/")[0];
        const xi = +key.split("/")[1];
        const keyValue = data[key] ? data[key].join() : null;
        // console.log(game.embroideryMap[yi][xi].color.join() , keyValue);

        if(game.embroideryMap[yi][xi].color.join() === keyValue){
          numberTrueCrosses++;
        }
      });

      const progress = (100 / numberCrosses) * numberTrueCrosses;
      
      dispatch(
        state.game.progress.gUpdate(
          progress
        )
      );
    }
};