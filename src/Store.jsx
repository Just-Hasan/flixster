import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./Global/HomepageSlice";
import moviePageReducer from "./Global/MoviesPageSlice";
import tvPageReducer from "./Global/TvPageSlice";
import navbarReducer from "./Global/NavbarSlice";
import themeReducer from "./Global/ThemeSlice";
import selectedMovieReducer from "./Global/SelectedMovieSlice";
import favouriteReducer from "./Global/FavouriteSlice";

/////////////////////////////////////[Redux Persist]
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const themePersistConfig = {
  key: "flixster_theme",
  version: 1,
  storage,
};

const favMoviesPersistConfig = {
  key: "flixster_fav_movie",
  version: 1,
  storage,
};

const reducer = combineReducers({
  homepage: homepageReducer,
  navbar: navbarReducer,
  selected_movie: selectedMovieReducer,
  tv_show: tvPageReducer,
  movie: moviePageReducer,
  favourite: persistReducer(favMoviesPersistConfig, favouriteReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
});

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "selected_movie/getSelectedMovieData",
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  reducer,
});

export default store;
