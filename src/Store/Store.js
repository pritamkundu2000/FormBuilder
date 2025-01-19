import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../Features/authSlice" 

export const Store=configureStore({
    reducer:{
        auth: authReducer,
    }
})