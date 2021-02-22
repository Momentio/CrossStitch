import resources from "./resources";

export default (callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();

      let images = {};

      function loader(){
        let keysResources = Object.keys(resources);
        let keysImages = Object.keys(images);

        if(keysResources.length > keysImages.length){
          keysResources.forEach((key, i) => {
            if(i === keysImages.length){
              let img = new Image();
    
              img.onload = () => {
                images[key] = img;
                loader();
              }
    
              img.src = resources[key];
            }
          });

        }else{
          dispatch(
            state.game.resources.gUpdate(
              images
            )
          );

          callback();
        }
      }

      loader();
    }
};