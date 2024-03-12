import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movieData: [],
};

const SelectedMovieSlice = createSlice({
  name: "selected_movie",
  initialState,
  reducers: {
    getSelectedMovieData(state, action) {
      state.movieData = action.payload;
    },
  },
});

export default SelectedMovieSlice.reducer;

export function getMovieData(movieID, type) {
  console.log(type);
  return async function getMovieDatas(dispatch) {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}`,
        {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        }
      );
      dispatch({
        type: "selected_movie/getSelectedMovieData",
        payload: data.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
