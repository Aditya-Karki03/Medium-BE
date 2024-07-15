import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface initialStateType{
    BlogItems:[{}]
}
let initialState:initialStateType={
    BlogItems:[{}]
}

const blogSlice=createSlice({
    name:'Blogs',
    initialState,
    reducers:{
        addBlog:(state,action:PayloadAction<{}>)=>{
            state.BlogItems.push(action.payload)
        }
    }
})

export const {addBlog}=blogSlice.actions;
export default blogSlice.reducer;