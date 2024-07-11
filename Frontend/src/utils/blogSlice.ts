import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogTypes{
    
}

const cartSlice=createSlice({
    name:'Blogs',
    initialState:{
        BlogItems:[]
    },
    reducers:{
        addBlog:(state,action:PayloadAction<String>)=>{
            state.BlogItems.push(action.payload)
        }
    }
})