import { fireEvent, screen } from "@testing-library/react";
import CharacterCard from "@/app/components/CharacterCard/CharacterCard";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockCharacters } from "@/__mocks__/storeMocks";

describe("Character Card Unit Tests", () => {
  const defaultProps = {
    character: mockCharacters[0],
    disableCard: false,
    isSelected: false,
    handleSelectCharacter: jest.fn(),
  };
  it("The character card should component should render", () => {
    renderWithStore(<CharacterCard {...defaultProps} />, {});

    const characterCardComponent = screen.getByTestId("character-card");

    expect(characterCardComponent).toHaveClass("bg-black");
    expect(characterCardComponent).toBeInTheDocument();
  });

  it("The character card should component should render the correct data", () => {
    renderWithStore(<CharacterCard {...defaultProps} />, {});

    const characterCardImage = screen.getByTestId("character-card-image");
    const characterCardName = screen.getByTestId("character-card-name");
    const characterCardStatus = screen.getByTestId("character-card-status");
    const characterCardDetails = screen.getByTestId("character-card-details");

    expect(characterCardImage).toBeInTheDocument();
    expect(characterCardName).toBeInTheDocument();
    expect(characterCardStatus).toBeInTheDocument();
    expect(characterCardStatus).toHaveClass("bg-green-600");
    expect(characterCardDetails).toBeInTheDocument();
  });

  it("The character card should execute handleSelectCharacter on click", () => {
    renderWithStore(<CharacterCard {...defaultProps} />, {});

    const characterCardComponent = screen.getByTestId("character-card");

    fireEvent.click(characterCardComponent);

    expect(defaultProps.handleSelectCharacter).toHaveBeenCalled();
  });

  it("The character card should not execute handleSelectCharacter in case of being disabled", () => {
    const props = { ...defaultProps, disableCard: true };
    renderWithStore(<CharacterCard {...props} />, {});

    const characterCardComponent = screen.getByTestId("character-card");

    fireEvent.click(characterCardComponent);

    expect(defaultProps.handleSelectCharacter).toHaveBeenCalled();
  });

  it("The character card have the correct classes in case of being selected", () => {
    const props = { ...defaultProps, isSelected: true };
    renderWithStore(<CharacterCard {...props} />, {});

    const characterCardComponent = screen.getByTestId("character-card");

    expect(characterCardComponent).toHaveClass(
      "shadow-md shadow-yellow-600 border-yellow-600 hover:shadow-yellow-600"
    );
  });
});
