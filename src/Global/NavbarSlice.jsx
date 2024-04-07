import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchValue: "",
  searched: [],
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    searchQuery(state, action) {
      state.searchValue = action.payload;
    },
    searchedData(state, action) {
      state.searched = action.payload.data;
    },
  },
});

export default navbarSlice.reducer;

export function searchMovieOrTv(query) {
  return async function getData(dispatch) {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/multi",
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            query,
            page: 1,
          },
        },
      );
      dispatch({
        type: "navbar/searchedData",
        payload: {
          data: data.results,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const { searchQuery } = navbarSlice.actions;
