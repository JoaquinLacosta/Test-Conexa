"use client";

import { Character, PaginationInfo } from "@/app/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharactersState {
  characters: Record<number, Character[]>;
  loadingCharacters: boolean;
  currentPage: number;
  firstCharacterPage: number;
  secondCharacterPage: number;
  loadingFirstCharacterList: boolean;
  loadingSecondCharacterList: boolean;
  paginationInfo?: PaginationInfo;
  firstCharacter?: Character;
  secondCharacter?: Character;
}

const initialState: CharactersState = {
  characters: [],
  loadingCharacters: true,
  loadingFirstCharacterList: true,
  loadingSecondCharacterList: true,
  paginationInfo: undefined,
  currentPage: 1,
  firstCharacterPage: 1,
  secondCharacterPage: 1,
  firstCharacter: undefined,
  secondCharacter: undefined,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters[state.currentPage] = action.payload;
    },
    setLoadingCharacters: (state, action: PayloadAction<boolean>) => {
      state.loadingCharacters = action.payload;
    },
    setPaginationInfo: (state, action: PayloadAction<PaginationInfo>) => {
      state.paginationInfo = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFirstCharacterPage: (state, action: PayloadAction<number>) => {
      state.firstCharacterPage = action.payload;
    },
    setSecondCharacterPage: (state, action: PayloadAction<number>) => {
      state.secondCharacterPage = action.payload;
    },
    setFirstCharacter: (
      state,
      action: PayloadAction<Character | undefined>
    ) => {
      state.firstCharacter = action.payload;
    },
    setSecondCharacter: (
      state,
      action: PayloadAction<Character | undefined>
    ) => {
      state.secondCharacter = action.payload;
    },
    setLoadingFirstCharacterList: (state, action: PayloadAction<boolean>) => {
      state.loadingFirstCharacterList = action.payload;
    },
    setLoadingSecondCharacterList: (state, action: PayloadAction<boolean>) => {
      state.loadingSecondCharacterList = action.payload;
    },
  },
});

export const {
  addCharacters,
  setLoadingCharacters,
  setPaginationInfo,
  setCurrentPage,
  setFirstCharacterPage,
  setSecondCharacterPage,
  setFirstCharacter,
  setSecondCharacter,
  setLoadingFirstCharacterList,
  setLoadingSecondCharacterList,
} = charactersSlice.actions;

export default charactersSlice.reducer;
