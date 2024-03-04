import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./Global/HomepageSlice";

const store = configureStore({ reducer: { homepage: homepageReducer } });

export default store;
