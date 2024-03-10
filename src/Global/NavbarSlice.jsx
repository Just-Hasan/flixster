import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchValue: "",
  searched: [],
  page: 0,
  totalPage: 0,
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
      state.totalPage = action.payload.totalPages;
      state.page = action.payload.currentPage;
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
          },
        }
      );
      console.log(data);
      dispatch({
        type: "navbar/searchedData",
        payload: {
          data: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const { searchQuery } = navbarSlice.actions;
