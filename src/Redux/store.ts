import { configureStore } from "@reduxjs/toolkit";
import errorAndLoaderSlice from "./features/errorAndLoaderSlice";
import projectSlice from "./features/projectSlice";

const store = configureStore({
  reducer: {
    errorAndLoader: errorAndLoaderSlice,
    project: projectSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
