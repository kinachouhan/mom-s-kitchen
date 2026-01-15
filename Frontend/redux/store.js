import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import foodItemReducer from "./fooditemSlice"
import cartReducer from "./cartSlice"
 
export const store = configureStore({
  reducer: {
     auth : authReducer,
     foodItems: foodItemReducer,
     cart: cartReducer
  },
});
