import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./Global/HomepageSlice";
import navbarReducer from "./Global/NavbarSlice";
import themeReducer from "./Global/ThemeSlice";

/////////////////////////////////////[Redux Persist]
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";

const themePersistConfig = {
  key: "Theme",
  version: 1,
  storage,
};

const reducer = combineReducers({
  homepage: homepageReducer,
  navbar: navbarReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
});

const store = configureStore({
  reducer,
});

export default store;
