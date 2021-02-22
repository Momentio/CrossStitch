import axios from "axios";

export default (path, data, headers,  callback = () => {}) => {
    return (dispatch, getState)=>{
        const state = getState();

        axios({
            url: `${state.gValue.api.url}/${path}`,
            method :"POST",
            data: data,
            headers,
        })
        .then((response) => {
            callback(false, response.data);
        })
        .catch((error) => {
            callback(error, false);
        })
    }
};