import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    savePost: [],
  },
  reducers: {
    addToSavePost: (state, action) => {
        // const existingPostIndex = state.savePost.findIndex(post => post.id === action.payload.id);
        // if (existingPostIndex !== -1) {
        //     // If it exists, remove it (unsave)
        //     state.savePost.splice(existingPostIndex, 1);
        // } else {
        //     // If it does not exist, add it (save)
        //     state.savePost.push(action.payload);
        // }
      const exist = state.savePost.some(
        (post) => post?._id === action?.payload?._id  //some mwthod return the boolean value on the basis of conditon and find method return the items that which item satisfied the condition.
      );

      if(exist) {
        state.savePost = state.savePost.filter( (item) => {
            if(item?._id !== action?.payload?._id) return item
        })
      } else{
        state.savePost.push(action?.payload);
      }

       
    },
  },
});

export const { addToSavePost } = postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;
