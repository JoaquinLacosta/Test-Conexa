import { Character } from "@/app/common/types";
import CharacterCard from "../CharacterCard/CharacterCard";
import Spinner from "../Spinner/Spinner";

interface CharacterListProps {
  characters: Character[];
  listNumber: number;
  loadingCharacters: boolean;
  handleSelectCharacter: (character: Character) => void;
  disableCharacterCard: (id: number, characterType: number) => boolean;
  isCharacterCardSelected: (id: number, characterType: number) => boolean;
}

export default function CharacterList({
  characters,
  loadingCharacters,
  listNumber,
  handleSelectCharacter,
  disableCharacterCard,
  isCharacterCardSelected,
}: CharacterListProps) {
  return loadingCharacters ? (
    <div className="w-full my-4">
      <Spinner />
    </div>
  ) : (
    <div className="grid w-full grid-cols-characters-list gap-x-3 gap-y-4 px-2 py-3">
      {characters.map((character) => (
        <CharacterCard
          key={`character-${listNumber}-${character.id}`}
          disableCard={disableCharacterCard(character.id, listNumber)}
          character={character}
          isSelected={isCharacterCardSelected(character.id, listNumber)}
          handleSelectCharacter={handleSelectCharacter}
        />
      ))}
    </div>
  );
}
