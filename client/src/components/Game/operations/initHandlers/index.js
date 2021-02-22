import handlerMouseDown from "./handlerMouseDown";
import handlerWheel from "./handlerWheel";
import handlerKeyDown from "./handlerKeyDown";
import handlerTouch from "./handlerTouch";
import adapt from "../adapt";
import render from "../render";

export default () => {
    return (dispatch, getState)=>{
      const $canva = document.getElementById("canvas");

      $canva.addEventListener("mousedown", event => {
        dispatch(handlerMouseDown(event));
      });

      $canva.addEventListener("touchstart", event => {
        dispatch(handlerTouch(event));
      });

      document.body.addEventListener("keydown", event => {
        dispatch(handlerKeyDown(event));
      });

      let dispatchHandlerWheel = event => dispatch(handlerWheel(event));

      if ($canva.addEventListener) {
        if ('onwheel' in document) {
          $canva.addEventListener("wheel", dispatchHandlerWheel);

        } else if ('onmousewheel' in document) {
          $canva.addEventListener("mousewheel", dispatchHandlerWheel);

        } else {
          $canva.addEventListener("MozMousePixelScroll", dispatchHandlerWheel);
        }

      } else {
        $canva.attachEvent("onmousewheel", dispatchHandlerWheel);
      }

      document.body.onresize = () => {
        dispatch(
          adapt()
        );
        dispatch(
          render()
        );
      }
    }
};