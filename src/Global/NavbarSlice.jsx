import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    searchQuery(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export default navbarSlice.reducer;

export const { searchQuery } = navbarSlice.actions;
