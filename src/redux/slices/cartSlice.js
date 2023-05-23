import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  totalPrice: 0,
  items: []

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers : {
    //add product to cart
    addProduct(state, action) {
      state.items.push(action.payload)
    },
    //remove product from cart
    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    //clear all cart
    clearItem(state) {
      state.items = []
    }
  }
})

export const { addProduct, removeItem, clearItem
} = cartSlice.actions
export default cartSlice.reducer