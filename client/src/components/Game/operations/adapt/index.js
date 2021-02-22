
export default (callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();
      let session = state.game.session.gValue;

      const imageSize = session.imageSize;

      if(imageSize){
        let canvasSize;
  
        const availWidth = screen.width;
  
        if(availWidth <= 420){
          canvasSize =  availWidth;
          
        }else if(availWidth <= 768){
          canvasSize =  availWidth;
  
        }else{
          canvasSize =  600;
        }
  
        const fkdflk = Math.floor(
          canvasSize / imageSize
        );
  
        const embroiderySize = imageSize * fkdflk;
  
        const embroideryCoordinates = {
          x: Math.floor((canvasSize - embroiderySize) / 2),
          y: Math.floor((canvasSize - embroiderySize) / 2),
        };
  
        const crossSize = embroiderySize / imageSize;
        const location = {x: 0, y: 0};
        const scale = 1;
        
        dispatch(
          state.game.canvasSize.gUpdate(canvasSize)
        );
  
        dispatch(
          state.game.embroiderySize.gUpdate(embroiderySize)
        );
  
        dispatch(
          state.game.embroideryCoordinates.gUpdate(embroideryCoordinates)
        );
  
        dispatch(
          state.game.crossSize.gUpdate(crossSize)
        );
  
        dispatch(
          state.game.location.gUpdate(location)
        );
  
        dispatch(
          state.game.scale.gUpdate(scale)
        );

        callback(true);

      }else{
        dispatch(
          state.game.status.gUpdate("Неизвестный размер изображения")
        );

        callback(false);
      }
    }
};