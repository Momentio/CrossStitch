import renderEmbrodeiry from "../../middlewares/renderEmbrodeiry";

export default (updatedCrossIndexes) => {
    return (dispatch, getState)=>{
      const state = getState();
      let game = state.game.gValue;

      const $canva = document.getElementById("canvas");
      const ctx = $canva.getContext('2d');

      renderEmbrodeiry(
        ctx,
        game,
        updatedCrossIndexes
      );
    }
};