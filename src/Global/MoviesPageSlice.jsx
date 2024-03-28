import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
};
const MoviesPageSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export function getMoviesData(sort_by) {
  return async function getMovieData(dispatch) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}discover/movie`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            page: 1,
            sort_by: sort_by,
          },
        },
      );
      dispatch({ type: "movies/getMovies", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export default MoviesPageSlice.reducer;
