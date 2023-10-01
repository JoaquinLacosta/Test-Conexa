import { fireEvent, screen } from "@testing-library/react";
import CombineButton from "@/app/components/CombineButton/CombineButton";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockCharacters, mockUseFetchState } from "@/__mocks__/storeMocks";

describe("Combine Button Unit Tests", () => {
  it("The combine button component should render", () => {
    renderWithStore(<CombineButton />, {});

    const combineButton = screen.getByTestId("combine-button");
    const plusIcon = screen.getByTestId("plus-icon");

    expect(combineButton).toBeInTheDocument();
    expect(plusIcon).toBeInTheDocument();
  });

  it("The combine button component should not execute fetchEpisodes on click in case of being disabled", () => {
    const { fetchEpisodes } = mockUseFetchState;
    renderWithStore(<CombineButton />, {});

    const combineButton = screen.getByTestId("combine-button");

    fireEvent.click(combineButton);
    expect(fetchEpisodes).not.toBeCalled();
    expect(combineButton).toHaveClass("bg-white");
  });

  it("The combine button component should execute fetchEpisodes on click", () => {
    const { fetchEpisodes } = mockUseFetchState;
    renderWithStore(<CombineButton />, {
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

    const combineButton = screen.getByTestId("combine-button");

    fireEvent.click(combineButton);
    expect(fetchEpisodes).toBeCalled();
    expect(combineButton).toHaveClass("bg-green-500");
  });
});
