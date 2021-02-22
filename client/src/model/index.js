
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import game from "../components/Game/model";
import api from "./api";

/**
 *  В своих приложениях для создания моделей, а
 * также для их дальнейшего контроля, я использую
 * свой npm пакет - GlobalModel. Эта штука ещё не
 * задокументирована, в виду того что написал я её
 * сравнительно недавно. Экземпляры GlobalModel
 * имеют: собственный редюсер; тип; структуру;
 * изначальное состояние; текущее состояние, 
 * вычисляемое редюсором в зависимости от
 * действий; и методы для генерации этих
 * действий. 
 */

import GlobalModel from "global-model";

const reducer = (state, action) => {
    // console.log(action);
    if(state){
        return state.gReducer(action);

    }else{
        return new GlobalModel(
            false,
            "app",
            {
                api: api("app").gValue,
                game: game("app").gValue,
                mode: 0 ? "combat" : "presentation",
            },
            {
                api: api("app").gStructure,
                game: game("app").gStructure,
                mode: "presentation",
            }
        ).gReducer(action);
    }
};

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

// store.subscribe(()=>{
//     console.log("store",store.getState())
// });

console.log("store",store.getState());

export default store;