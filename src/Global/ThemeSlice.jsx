import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "dark" };

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export default ThemeSlice.reducer;
export const { setTheme } = ThemeSlice.actions;

export const getTheme = (store) => store.theme.theme;
