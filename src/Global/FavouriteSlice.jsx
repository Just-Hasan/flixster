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
      console.log(action.payload);
      // Filtering out the movies that we wanna remove
      const updatedFavourite = state.favourites.filter(
        (movie) => movie.id !== action.payload,
      );

      // Returning an object (literally the whole state)
      return { ...state, favourites: updatedFavourite };
    },
  },
});

export default FavouriteSlice.reducer;

export const { addToFavourite, removeFromFavourite } = FavouriteSlice.actions;

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
