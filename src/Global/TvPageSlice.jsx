import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tv: [],
  status: "idle",
  error: "",
};

export const fetchTvShow = createAsyncThunk(
  "tv/fetchTvShow",
  async function ({ page, sort }) {
    const { data } = await axios.get(
      `${import.meta.env.VITE_TMDB_BASE_URL}discover/tv`,
      {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          page: Number(page) || 1,
          sort_by: sort,
        },
      },
    );
    return data;
  },
);

const TvPageSlice = createSlice({
  name: "tv",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTvShow.fulfilled, (state, action) => {
        state.status = "idle";
        state.tv = action.payload;
      })
      .addCase(fetchTvShow.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default TvPageSlice.reducer;

export const getTvShow = (store) => {
  return {
    tv: store?.tv_show?.tv,
    status: store?.tv_show?.status,
    error: status?.tv_show?.error,
  };
};
