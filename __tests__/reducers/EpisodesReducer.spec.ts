import { Episode } from "@/app/common/types";
import {
  EnhancedStore,
  configureStore,
} from "@reduxjs/toolkit";
import episodesReducer, {
  addEpisodes,
  setLoadingEpisodes,
  setShowEpisodesSection,
} from "../../app/redux/reducers/episodesReducer";
import { mockEpisodes } from "@/__mocks__/storeMocks";

describe("Episodes Reducer Unit Tests", () => {
  let store: EnhancedStore<{
    episodesReducer: ReturnType<typeof episodesReducer>;
  }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        episodesReducer: episodesReducer,
      },
    });
  });

  it("Should add episodes to state", () => {
    const episodes: Episode[] = [mockEpisodes[0], mockEpisodes[1]];
    store.dispatch(addEpisodes(episodes));

    const state = store.getState().episodesReducer;
    expect(state.episodes).toEqual(episodes);
  });

  it("Should set loadingEpisodes to true", () => {
    store.dispatch(setLoadingEpisodes(true));

    const state = store.getState().episodesReducer;
    expect(state.loadingEpisodes).toBe(true);
  });

  it("Should set showEpisodesSection to false", () => {
    store.dispatch(setShowEpisodesSection(false));

    const state = store.getState().episodesReducer;
    expect(state.showEpisodesSection).toBe(false);
  });
});
