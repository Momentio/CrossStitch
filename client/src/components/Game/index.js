import {connect} from "react-redux";
import View from './view';
import operations from "./operations";

const controller=connect(
    state=>({
        gModel: state.game,
        operations
    }),
    dispatch=>{
        return {
            dispatch
        }
    }
)(View);

export default controller;