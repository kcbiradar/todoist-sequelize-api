import { configureStore } from "@reduxjs/toolkit";
import errorAndLoaderSlice from "./features/errorAndLoaderSlice";

const store = configureStore({
  reducer: {
    errorAndLoader: errorAndLoaderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
