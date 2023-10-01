import { screen } from "@testing-library/react";
import EpisodesList from "@/app/components/EpisodesList/EpisodesList";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockCharacters, mockEpisodes } from "@/__mocks__/storeMocks";

describe("Combine Button Unit Tests", () => {
  const defaultProps = {
    episodes: [],
    name: "mockName",
  };

  it("The episodes list component should render", () => {
    renderWithStore(<EpisodesList {...defaultProps} />, {});

    const episodesList = screen.getByTestId("episodes-list");

    expect(episodesList).toBeInTheDocument();
  });

  it("The episodes list should render the accordion", () => {
    renderWithStore(<EpisodesList {...defaultProps} />, {});

    const accordionComponent = screen.getByTestId("accordion-component");

    expect(accordionComponent).toBeInTheDocument();
  });

  it("The episodes list should render the empty state in case of not having episodes", () => {
    renderWithStore(<EpisodesList {...defaultProps} />, {
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

    const emptyState = screen.getByTestId("episodes-list-empty-state");

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent(
      `There are no episodes in common between ${mockCharacters[1].name} and ${mockCharacters[2].name}`
    );
  });

  it("The episodes list should render the list of episodes", () => {
    const props = { ...defaultProps, episodes: mockEpisodes };
    renderWithStore(<EpisodesList {...props} />, {
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

    const episodesListItem = screen.getAllByTestId("episodes-list-item");

    expect(episodesListItem).toHaveLength(51);
  });
});
