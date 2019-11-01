export const saveItem = item =>{
    return {
        type : "SAVE_ITEM",
        data : item
    }    
}


export const deleteItem = items =>{
    return {
        type : "DELETE_ITEM",
        data : items
    };    
};

// export const updateItem = items =>{
//     return {
//         type : "UPDATE_ITEM",
//         data : items
//     }    
// }

export const editItem = itemIndex => {
    return {
        type : "EDIT_ITEM",
        data : itemIndex
    };
};

export const saveBucket = bucket =>{
    return {
        type : "SAVE_BUCKET",
        data : bucket
    };    
};