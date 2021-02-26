import resources from "./resources";

export default (callback = () => {}) => {
    return (dispatch, getState)=>{
      const state = getState();

      const images = {};

      function loader(){
        const keysResources = Object.keys(resources);
        const keysImages = Object.keys(images);

        if(keysResources.length > keysImages.length){
          keysResources.forEach((key, i) => {
            if(i === keysImages.length){
              const img = new Image();
    
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