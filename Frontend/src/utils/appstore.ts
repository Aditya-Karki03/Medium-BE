import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice"; // Import the reducer

const appStore = configureStore({
    reducer: {
        blog: blogReducer // Use the correct import
    }
});

export default appStore;
