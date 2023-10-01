import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Character } from "../common/types";
import {
  setFirstCharacter,
  setSecondCharacter,
} from "../redux/reducers/charactersReducer";
import { setShowEpisodesSection } from "../redux/reducers/episodesReducer";

export default function useSelectCharacters() {
  const dispatch = useDispatch();
  const { firstCharacter, secondCharacter } = useSelector(
    (state: RootState) => state.charactersReducer
  );

  const handleSelectFirstCharacter = (character: Character): void => {
    dispatch(setShowEpisodesSection(false));
    if (firstCharacter && firstCharacter.id === character.id) {
      dispatch(setFirstCharacter(undefined));
    } else {
      dispatch(setFirstCharacter(character));
    }
  };

  const handleSelectSecondCharacter = (character: Character): void => {
    dispatch(setShowEpisodesSection(false));
    if (secondCharacter && secondCharacter.id === character.id) {
      dispatch(setSecondCharacter(undefined));
    } else {
      dispatch(setSecondCharacter(character));
    }
  };

  const disableCharacterCard = (id: number, characterType: number): boolean => {
    if (characterType === 1) {
      return Boolean(secondCharacter && secondCharacter.id === id);
    } else {
      return Boolean(firstCharacter && firstCharacter.id === id);
    }
  };

  const isCharacterCardSelected = (id: number, characterType: number): boolean => {
    if (characterType === 1) {
      return Boolean(firstCharacter && firstCharacter.id === id);
    } else {
      return Boolean(secondCharacter && secondCharacter.id === id);
    }
  };

  return {
    handleSelectFirstCharacter,
    handleSelectSecondCharacter,
    disableCharacterCard,
    isCharacterCardSelected,
  };
}
