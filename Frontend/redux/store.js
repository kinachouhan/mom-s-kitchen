import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import foodItemReducer from "./fooditemSlice"

export const store = configureStore({
  reducer: {
     auth : authReducer,
     foodItems: foodItemReducer
  },
});
