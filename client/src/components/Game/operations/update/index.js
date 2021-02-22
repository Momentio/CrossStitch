import saveSession from "../saveSession";
import calcProgress from "../calcProgress";
import render from "../render";
import checkWin from "../checkWin";

export default (updatedCrossIndexes) => {
    return (dispatch, getState)=>{
      dispatch(
        saveSession()
      );
      
      dispatch(
        calcProgress()
      );

      dispatch(
        render(updatedCrossIndexes)
      );
      
      dispatch(
        checkWin()
      );
    }
};