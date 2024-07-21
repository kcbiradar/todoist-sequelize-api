import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type errorAndLoaderType = {
  loading: boolean;
  error: boolean;
};

const initialState: errorAndLoaderType = {
  loading: false,
  error: false,
};

const errorAndLoaderSlice = createSlice({
  name: "errorAndLoader",
  initialState: initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoader, setError } = errorAndLoaderSlice.actions;

export default errorAndLoaderSlice.reducer;
