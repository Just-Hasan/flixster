import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movieData: [],
  movieVids: [],
  movieCredits: [],
  movieProvider: [],
  similarMovie: [],
};

const SelectedMovieSlice = createSlice({
  name: "selected_movie",
  initialState,
  reducers: {
    getSelectedMovieData(state, action) {
      state.movieData = action.payload;
    },
    getSelectedMovieVideos(state, action) {
      state.movieVids = action.payload;
    },
    getSelectedMovieCredits(state, action) {
      state.movieCredits = action.payload;
    },
    getSelectedMovieProvider(state, action) {
      state.movieProvider = action.payload;
    },
    getSelectedMovieSimilar(state, action) {
      state.similarMovie = action.payload;
    },
  },
});

export default SelectedMovieSlice.reducer;

export function getMovieData(movieID, type) {
  return async function getMovieDatas(dispatch) {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}`,
        {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        },
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

export function getMovieVideo(movieID, type) {
  return async function getMovieVids(dispatch) {
    try {
      const request = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}/videos`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        },
      );
      dispatch({
        type: "selected_movie/getSelectedMovieVideos",
        payload: request.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getMovieCredits(movieID, type) {
  return async function (dispatch) {
    try {
      const request = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}/credits`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        },
      );
      dispatch({
        type: "selected_movie/getSelectedMovieCredits",
        payload: request.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getMovieProvider(movie_id, movie_type) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${movie_type}/${movie_id}/watch/providers`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        },
      );
      dispatch({
        type: "selected_movie/getSelectedMovieProvider",
        payload: data.results,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getMovieSimilar(movie_id, movie_type) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_TMDB_BASE_URL}${movie_type}/${movie_id}/recommendations`,
        {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        },
      );
      dispatch({
        type: "selected_movie/getSelectedMovieSimilar",
        payload: data.results,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
