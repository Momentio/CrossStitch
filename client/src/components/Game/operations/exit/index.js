import killSession from "../killSession";
import init from "../init";

export default () => {
    return (dispatch, getState)=>{
      dispatch(
        killSession()
      );

      dispatch(
        init()
      );
    }
};