import { combineReducers } from "redux";
const initialState = {
    items : [{id:0, data:"This is default task", isComplete:false},
            {id:1, data:"Default Task 2", isComplete:false},
            {id:2, data:"This is default task", isComplete:true},
            {id:3, data:"Default Task 2", isComplete:false}],
    currentItem : {}
  };
  
function itemList(state = initialState, action) {
    switch(action.type){
        case "SAVE_ITEM": 
            return {...state, items:[...state.items, action.data], currentItem : {}} ;
        case "DELETE_ITEM":
            return {...state, items:action.data} ;
        case "UPDATE_ITEM":
            return {...state, items:action.data, currentItem : {}} ;
        case "EDIT_ITEM" :
            return {...state, currentItem:action.data} ;
        default: 
            return initialState;  
    }
}
export default combineReducers({
    list:itemList
});


