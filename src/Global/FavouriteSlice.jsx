import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite(state, action) {
      state.favourites.push(action.payload);
    },
    removeFromFavourite(state, action) {
      // Filtering out the movies that we wanna remove
      const updatedFavourite = state.favourites.filter(
        (movie) => movie.id !== action.payload,
      );

      // Returning an object (literally the whole state)
      return { ...state, favourites: updatedFavourite };
    },
    addReviewsToFavourite(state, action) {
      const addReviewsToFavourite = state.favourites.map((favMovie) => {
        return favMovie.id === action.payload.id
          ? { ...favMovie, reviews: action.payload.reviews }
          : favMovie;
      });

      return { ...state, favourites: addReviewsToFavourite };
    },
  },
});

export default FavouriteSlice.reducer;

export const { addToFavourite, removeFromFavourite, addReviewsToFavourite } =
  FavouriteSlice.actions;

export const getFavourite = (store) => store.favourite.favourites;

export const getIsInsideFavourite = (id) => (store) => {
  const IsInFavouriteList = store.favourite.favourites
    ?.map((movie) => movie.id)
    .includes(id);

  return IsInFavouriteList;
};

export const getFavouriteRating = (id) => (store) => {
  const rating = store.favourite.favourites?.find(
    (movie) => movie.id === id,
  )?.rating;
  return rating ?? null;
};

export const getFavouriteReviews = (id) => (store) => {
  const hasReviews = store.favourite.favourites?.find(
    (movie) => movie.id === id,
  )?.reviews;

  return hasReviews ?? null;
};
