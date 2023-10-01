import { screen } from "@testing-library/react";
import Home from "@/app/page";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockCharacters, mockUseFetchState } from "@/__mocks__/storeMocks";

describe("Home Page Unit Tests", () => {
  it("The main component should render", () => {
    renderWithStore(<Home />, {});

    const main = screen.getByTestId("home-page");

    expect(main).toBeInTheDocument();
  });

  it("The fetch characters function should be called in case of not having the first page of characters", () => {
    const { fetchCharacters } = mockUseFetchState;
    renderWithStore(<Home />, {});

    expect(fetchCharacters).toBeCalledWith(1, 1);
  });

  it("The characters list should be called twice", () => {
    renderWithStore(<Home />, {
      charactersReducer: {
        firstCharacter: mockCharacters[1],
        secondCharacter: mockCharacters[2],
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
        episodes: [],
      },
    });

    const characterLists = screen.getAllByTestId("character-list");

    expect(characterLists).toHaveLength(2);
  });

  it("The combine button should be rendered", () => {
    renderWithStore(<Home />, {});

    const combineButton = screen.getByTestId("combine-button");

    expect(combineButton).toBeInTheDocument();
  });

  it("The accordion should be called two times in case of not having the episodes section available", () => {
    renderWithStore(<Home />, {});

    const accordionComponents = screen.getAllByTestId("accordion-component");

    expect(accordionComponents).toHaveLength(2);
  });

  it("The accordion should be called five times in case of having the episodes section available", () => {
    renderWithStore(<Home />, {
      charactersReducer: {
        firstCharacter: mockCharacters[1],
        secondCharacter: mockCharacters[2],
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
        episodes: [],
      },
    });

    const accordionComponents = screen.getAllByTestId("accordion-component");

    expect(accordionComponents).toHaveLength(5);
  });

  it("The episodes section should show the loader in case of being loading", () => {
    renderWithStore(<Home />, {
      charactersReducer: {
        firstCharacter: mockCharacters[1],
        secondCharacter: mockCharacters[2],
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
        loadingEpisodes: true,
        episodes: [],
      },
    });

    const spinner = screen.getByTestId("spinner-image");

    expect(spinner).toBeInTheDocument();
  });
});
