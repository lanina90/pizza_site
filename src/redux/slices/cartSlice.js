import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  totalPrice: 0,
  items: []

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload, count: 1
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.count * obj.price) + sum
      }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
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

export const {
  addItem, minusItem,removeItem, clearItem
} = cartSlice.actions
export default cartSlice.reducer