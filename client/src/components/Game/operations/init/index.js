import api from "../../../../operations/api";
import killSession from "../killSession";
import start from "../start";
import img from "./olga.jpg";

export default () => {
    return (dispatch, getState)=>{
      const state = getState();
      const sessionModel = state.game.session;
      const httpQueryModel = state.game.httpQuery;
      const session = localStorage.getItem("session");
      
      function setSession(session){
        dispatch(
          sessionModel.image.gUpdate(
            session.image
          )
        );

        dispatch(
          sessionModel.data.gUpdate(
            session.data
          )
        );

        dispatch(
          sessionModel.numberColors.gUpdate(
            session.numberColors
          )
        );

        dispatch(
          sessionModel.imageSize.gUpdate(
            session.imageSize
          )
        );
      }

      const sessionObj = session ? JSON.parse(`${session}`) : null;
      
      switch(state.mode.gValue){
        case "combat":
          if(session){
            dispatch(
              httpQueryModel.isLoading.gUpdate(
                true
              )
            );

            dispatch(
              api.get(
                sessionObj.image,
                {},
                {},
                (error, data) => {
                  if(!error){
                    setSession(sessionObj);

                    dispatch(
                      start()
                    );

                  }else{
                    if(!data && error.name !== "TypeError"){
                        if(error.response){
                            dispatch(
                                httpQueryModel.status.gUpdate(true)
                            );

                            if(error.response.status === 404){
                              dispatch(
                                killSession()
                              );

                            }else{
                              dispatch(
                                httpQueryModel.error.gUpdate(
                                  error.response.status
                                )
                              );
                            }

                          }else {
                            dispatch(
                                httpQueryModel.status.gUpdate(false)
                            );
                          }

                    }else{
                        alert("Ошибка в модели данных");
                    }
                  }
            
                  dispatch(
                    httpQueryModel.isLoading.gUpdate(false)
                  );
                }
              )
            );

          }else{
            dispatch(
              state.game.status.gUpdate("uploadingImage")
            );
          }
        break;

        case "presentation":
          if(session){
            setSession(sessionObj);

            dispatch(
              start()
            );

          }else{
            setSession({
              image: `./${img}`,
              data: {}
            });
    
            dispatch(
              state.game.status.gUpdate("configuration")
            );
          }
        break;
      }
    }
};