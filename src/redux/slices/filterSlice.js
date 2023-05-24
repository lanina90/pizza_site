import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  searchValue : "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'most popular',
    sortProperty: "rating"
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers : {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    },
  }
})

export const {
  setCategoryId,
  setFilters,
  setSort,
  setCurrentPage,
  setSearchValue
} = filterSlice.actions
export default filterSlice.reducer