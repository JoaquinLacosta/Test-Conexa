import { Character } from "@/app/common/types";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import {
  mockCharacters,
  mockPaginationInfo,
} from "@/__mocks__/storeMocks";
import charactersReducer, {
  addCharacters,
  setCurrentPage,
  setFirstCharacter,
  setFirstCharacterPage,
  setLoadingCharacters,
  setLoadingFirstCharacterList,
  setLoadingSecondCharacterList,
  setPaginationInfo,
  setSecondCharacter,
  setSecondCharacterPage,
} from "@/app/redux/reducers/charactersReducer";

describe("Character Reducer Unit Tests", () => {
  let store: EnhancedStore<{
    charactersReducer: ReturnType<typeof charactersReducer>;
  }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        charactersReducer: charactersReducer,
      },
    });
  });

  it("Should add characters to state", () => {
    const characters: Character[] = [mockCharacters[6], mockCharacters[7]];
    store.dispatch(addCharacters(characters));

    const state = store.getState().charactersReducer;
    expect(state.characters[state.currentPage]).toEqual([
      mockCharacters[6],
      mockCharacters[7],
    ]);
  });

  it("Should set loadingCharacters to true", () => {
    store.dispatch(setLoadingCharacters(true));

    const state = store.getState().charactersReducer;
    expect(state.loadingCharacters).toBeTruthy();
  });

  it("Should set loadingFirstCharacterList to true", () => {
    store.dispatch(setLoadingFirstCharacterList(true));

    const state = store.getState().charactersReducer;
    expect(state.loadingFirstCharacterList).toBeTruthy();
  });

  it("Should set loadingSecondCharacterList to true", () => {
    store.dispatch(setLoadingSecondCharacterList(true));

    const state = store.getState().charactersReducer;
    expect(state.loadingSecondCharacterList).toBeTruthy();
  });

  it("Should set pagination info", () => {
    store.dispatch(setPaginationInfo(mockPaginationInfo));

    const state = store.getState().charactersReducer;
    expect(state.paginationInfo).toEqual(mockPaginationInfo);
  });

  it("Should set current page", () => {
    store.dispatch(setCurrentPage(2));

    const state = store.getState().charactersReducer;
    expect(state.currentPage).toEqual(2);
  });

  it("Should set first character page", () => {
    store.dispatch(setFirstCharacterPage(2));

    const state = store.getState().charactersReducer;
    expect(state.firstCharacterPage).toEqual(2);
  });

  it("Should set second character page", () => {
    store.dispatch(setSecondCharacterPage(2));

    const state = store.getState().charactersReducer;
    expect(state.secondCharacterPage).toEqual(2);
  });

  it("Should set first character", () => {
    store.dispatch(setFirstCharacter(mockCharacters[6]));

    const state = store.getState().charactersReducer;
    expect(state.firstCharacter).toEqual(mockCharacters[6]);
  });
  
  it("Should set second character", () => {
    store.dispatch(setSecondCharacter(mockCharacters[7]));

    const state = store.getState().charactersReducer;
    expect(state.secondCharacter).toEqual(mockCharacters[7]);
  })
});
