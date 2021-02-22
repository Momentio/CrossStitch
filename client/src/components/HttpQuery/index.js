import {connect} from "react-redux";
import View from './view';

const controller = connect(
    state => ({}),
    dispatch => {
        return {
            dispatch: dispatch
        }
    })(View);

export default controller;