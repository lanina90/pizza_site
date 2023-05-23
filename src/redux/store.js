import {configureStore} from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "../pages/Cart";

export const store = configureStore({
  reducer: {
    filter,
    cart
  }
})
