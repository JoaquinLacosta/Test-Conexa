import { mockCharacters, mockEpisodes } from "@/__mocks__/storeMocks";
import { store } from "@/app/redux/store";
import {
  getCommonCharactersEpisodes,
  getEpisodesIds,
  getEpisodesIdsToFetch,
  getPopulatedCharacterEpisodes,
} from "@/app/common/parseEpisodesIds";

jest.mock("../../app/redux/store");

const mockState = {
  charactersReducer: {
    firstCharacter: mockCharacters[6],
    secondCharacter: mockCharacters[7],
    loadingCharacters: false,
    characters: { 1: mockCharacters },
    currentPage: 1,
    firstCharacterPage: 1,
    secondCharacterPage: 1,
    loadingFirstCharacterList: false,
    loadingSecondCharacterList: false,
  },
  episodesReducer: {
    showEpisodesSection: true,
    loadingEpisodes: false,
    episodes: mockEpisodes,
  },
};

store.getState = () => mockState;

describe("Parse Episodes Utils Unit Tests", () => {
  it("getEpisodesIds should return the episodes ids from a character", () => {
    const episodesIds = getEpisodesIds(mockCharacters[6]);
    expect(episodesIds).toEqual([10, 11]);
  });

  it("getPopulatedCharacterEpisodes should return the episodes from a character", () => {
    const expectedResponse = mockEpisodes.find((episode) => episode.id === 14);
    const episodes = getPopulatedCharacterEpisodes([14], mockEpisodes);
    expect(episodes).toEqual([expectedResponse]);
  });

  it("getCommonCharactersEpisodes should return the episodes in common of two characters", () => {
    const episodes = getCommonCharactersEpisodes(
      mockCharacters[6],
      mockCharacters[7]
    );
    expect(episodes).toEqual([]);
  });

  it("getEpisodesIdsToFetch should return the episodes ids to fetch", () => {
    const episodesIds = getEpisodesIdsToFetch();
    expect(episodesIds).toEqual([]);
  });

  it("getEpisodesIdsToFetch should return the episodes ids to fetch", () => {
    store.getState = () => ({
      ...mockState,
      charactersReducer: {
        ...mockState.charactersReducer,
        firstCharacter: undefined,
      },
    });
    const episodesIds = getEpisodesIdsToFetch();
    expect(episodesIds).toEqual([]);
  });

  it("getEpisodesIdsToFetch should return the episodes ids to fetch", () => {
    store.getState = () => ({
      ...mockState,
      charactersReducer: {
        ...mockState.charactersReducer,
        secondCharacter: undefined,
      },
    });
    const episodesIds = getEpisodesIdsToFetch();
    expect(episodesIds).toEqual([]);
  });
});
