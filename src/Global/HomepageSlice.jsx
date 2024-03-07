import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial Data
const homepageInitialState = {
  airingLoading: false,
  airing: [],
  popular: [],
};

// Data Slice
const homepageSlice = createSlice({
  name: "homepage",
  initialState: homepageInitialState,
  reducers: {
    airingMovies(state, action) {
      state.airing = action.payload;
      state.airingLoading = false;
    },
    popularMovies(state, action) {
      state.popular = action.payload;
    },
    airingLoading(state, action) {
      state.airingLoading = action.payload;
    },
  },
});

//Action Creator
export function airingMovies() {
  //redux thunk stuff👇
  return async function (dispatch, getState) {
    dispatch({ type: "homepage/airingLoading", payload: true });
    try {
      const { data } = await axios.get(
        ` https://api.themoviedb.org/3/movie/now_playing`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
      );
      dispatch({ type: "homepage/airingMovies", payload: data.results });
    } catch (error) {
      dispatch({ type: "homepage/airingLoading", payload: false });
      console.log(error.message);
    } finally {
      dispatch({ type: "homepage/airingLoading", payload: false });
    }
  };
}

export function popularMovies() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        ` https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
      );

      dispatch({ type: "homepage/popularMovies", payload: data.results });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default homepageSlice.reducer;
