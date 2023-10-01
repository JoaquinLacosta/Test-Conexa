import { screen } from "@testing-library/react";
import CharacterList from "@/app/components/CharacterList/CharacterList";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockCharacters } from "@/__mocks__/storeMocks";

describe("Character List Unit Tests", () => {
  const defaultProps = {
    characters: [],
    listNumber: 1,
    loadingCharacters: false,
    handleSelectCharacter: jest.fn(),
    disableCharacterCard: jest.fn(),
    isCharacterCardSelected: jest.fn(),
  };
  it("The character list component should render", () => {
    renderWithStore(<CharacterList {...defaultProps} />, {});

    const characterListComponent = screen.getByTestId("character-list");

    expect(characterListComponent).toBeInTheDocument();
  });

  it("The character list should render the spinner in case of being loading", () => {
    const props = { ...defaultProps, loadingCharacters: true };
    renderWithStore(<CharacterList {...props} />, {});

    const characterListLoader = screen.getByTestId("spinner-image");

    expect(characterListLoader).toBeInTheDocument();
  });

  it("The character list should render the characters card in case of having data", () => {
    const props = { ...defaultProps, characters: mockCharacters };
    renderWithStore(<CharacterList {...props} />, {});

    const characterCards = screen.getAllByTestId("character-card");

    expect(characterCards).toHaveLength(20);
  });
});
