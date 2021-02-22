import initHandlers from "../initHandlers";
import setEmbroideryMap from "../setEmbroideryMap";
import loadResources from "../loadResources";
import adapt from "../adapt";
import update from "../update";

export default () => {
    return (dispatch, getState)=>{
      const state = getState();

      dispatch(
        adapt(
          (result) => {
            if(result){
      
              dispatch(
                state.game.status.gUpdate("loadingResources")
              );

              dispatch(
                loadResources(
                  () => {
                    dispatch(
                      state.game.status.gUpdate("quantization")
                    );
        
                    dispatch(
                     setEmbroideryMap(
                      () => {
                        dispatch(
                          state.game.status.gUpdate("play")
                        );
                        
                        dispatch(initHandlers());

                        dispatch(update());
                      }
                     ),
                    )
                  }
                )
              );
            }
          }
        )
      );
    }
};