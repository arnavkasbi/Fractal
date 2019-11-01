import { combineReducers } from "redux";
let buckets = {};
if (localStorage.getItem("buckets")) {
    buckets = JSON.parse(localStorage.getItem("buckets"));
}

const initialState = {
    currentItem: {},
    buckets: buckets
};

function itemList(state = initialState, action) {
    switch (action.type) {
        case "SAVE_ITEM":
            localStorage.setItem("buckets", JSON.stringify(action.data));
            return { ...state, buckets: action.data, currentItem: {} };
        case "DELETE_ITEM":
            localStorage.setItem("buckets", JSON.stringify(action.data));
            return { ...state, buckets: action.data };
        // case "UPDATE_ITEM":
        //     return { ...state, buckets: action.data, currentItem: {} };
        case "EDIT_ITEM":
            return { ...state, currentItem: action.data };
        case "SAVE_BUCKET":
            localStorage.setItem("buckets", JSON.stringify(action.data));
            return { ...state, buckets: action.data };
        default:
            return initialState;
    }
}

export default combineReducers({
    list: itemList
});


