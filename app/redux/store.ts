"use client";

import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./reducers/charactersReducer";
import episodesReducer from "./reducers/episodesReducer";

export const store = configureStore({
  reducer: {
    charactersReducer,
    episodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
