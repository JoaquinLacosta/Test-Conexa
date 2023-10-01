"use client";

import { Episode } from "@/app/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EpisodesState {
  episodes: Episode[];
  loadingEpisodes: boolean;
  showEpisodesSection: boolean;
}

const initialState: EpisodesState = {
  episodes: [],
  loadingEpisodes: false,
  showEpisodesSection: false,
};

export const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    addEpisodes: (state, action: PayloadAction<Episode[]>) => {
      state.episodes = [...state.episodes, ...action.payload];
    },
    setLoadingEpisodes: (state, action: PayloadAction<boolean>) => {
      state.loadingEpisodes = action.payload;
    },
    setShowEpisodesSection: (state, action: PayloadAction<boolean>) => {
      state.showEpisodesSection = action.payload;
    },
  },
});

export const { addEpisodes, setLoadingEpisodes, setShowEpisodesSection } =
  episodesSlice.actions;

export default episodesSlice.reducer;
