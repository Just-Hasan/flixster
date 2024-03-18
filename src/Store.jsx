import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./Global/HomepageSlice";
import navbarReducer from "./Global/NavbarSlice";
import themeReducer from "./Global/ThemeSlice";
import selectedMovieReducer from "./Global/SelectedMovieSlice";

/////////////////////////////////////[Redux Persist]
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";

const themePersistConfig = {
  key: "Theme",
  version: 1,
  storage,
};
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducer = combineReducers({
  homepage: homepageReducer,
  navbar: navbarReducer,
  selected_movie: selectedMovieReducer,
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
