import api from "../../../../operations/api";

export default (file) => {
    return (dispatch, getState)=>{
      const state = getState();
      const httpQueryModel = state.game.httpQuery;

      if(file){
        const formData = new FormData();
  
        formData.append('filedata', file);

        dispatch(
          httpQueryModel.isUploading.gUpdate(
            true
          )
        );

        dispatch(
          api.post(
            `upload`,
            formData,
            {
              "Content-Type": "multipart/form-data"
            },
            (error, data) => {
              if(!error){
                dispatch(
                  state.game.session.image.gUpdate(data)
                );

                dispatch(
                  state.game.status.gUpdate("configuration")
                );

              }else{
                if(!data && error.name !== "TypeError"){
                    if(error.response){
                        dispatch(
                            httpQueryModel.status.gUpdate(true)
                        );
                        
                        dispatch(
                            httpQueryModel.error.gUpdate(
                              error.response.status
                            )
                        );

                        dispatch(
                          state.game.status.gUpdate("При загрузке изображения произошла ошибка")
                        );

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
                httpQueryModel.isUploading.gUpdate(
                  false
                )
              );
            }
          )
        );
      }
    }
};