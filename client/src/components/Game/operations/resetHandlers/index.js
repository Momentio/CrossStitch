
export default () => {
    return (dispatch, getState)=>{
      const $canva = document.getElementById("canvas");

      $canva.addEventListener("mousedown", event => {});
      $canva.addEventListener("keydown", event => {});
      $canva.addEventListener("mousewheel", event => {});
    }
};