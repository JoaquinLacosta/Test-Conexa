import { mockUseFetchState, mockUseSelectCharactersState } from "./storeMocks";

// Mock useFetch
export const mockUseFetch = jest.fn();
mockUseFetch.mockReturnValue(mockUseFetchState);
jest.mock("../app/hooks/useFetch", () => mockUseFetch);

// Mock useSelectCharacter
export const mockUseSelectCharacters = jest.fn();
mockUseSelectCharacters.mockReturnValue(mockUseSelectCharactersState);
jest.mock("../app/hooks/useSelectCharacters", () => mockUseSelectCharacters);
