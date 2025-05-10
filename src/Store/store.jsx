import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './auth';  
import appReducer from './appSlice';
import mailReducer from './mailSlice';


const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    app: appReducer,
    mail: mailReducer,

  },
});

export default store;
