import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  totalPages: 1,
};
const MoviesPageSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovies(state, action) {
      state.movies = action.payload;
    },
    getTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export function getMoviesData(sort_by, page_num) {
  return async function getMovieData(dispatch) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}discover/movie`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            page: page_num || 1,
            sort_by: sort_by,
          },
        },
      );
      dispatch({ type: "movies/getMovies", payload: data });
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
}
export default MoviesPageSlice.reducer;
