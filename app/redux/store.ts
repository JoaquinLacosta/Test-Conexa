"use client";

import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./reducers/charactersReducer";
import episodesReducer from "./reducers/episodesReducer";

export const reducers = {
  charactersReducer,
  episodesReducer,
};

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
