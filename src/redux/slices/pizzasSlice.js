import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params, thunkAPI) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios(`http://localhost:3001/pizzas?${category}&_page=${currentPage}&_limit=4&_sort=${sortBy}&_order=${order}&${search}`)
    return data
  }
)
const initialState = {
  pizzas: [],
  status: 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.pizzas = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.pizzas = []
    }
  }
})

export const {setItems} = pizzasSlice.actions
export default pizzasSlice.reducer