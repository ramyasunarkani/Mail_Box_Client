import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{auth:false},
    reducers:{
        setAuth(state){
            state.auth=!state.auth;
        }
    }
})

 export const authActions=authSlice.actions;
 export default authSlice.reducer;