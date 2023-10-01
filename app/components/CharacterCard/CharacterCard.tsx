import { CharacterStatus } from "@/app/common/enums";
import { Character } from "@/app/common/types";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
  disableCard: boolean;
  isSelected: boolean;
  handleSelectCharacter: (character: Character) => void;
}

const determineStatusColor = (status: string): string => {
  switch (status) {
    case CharacterStatus.Alive:
      return "bg-green-600";
    case CharacterStatus.Dead:
      return "bg-red-600";
    case CharacterStatus.Unknown:
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

export default function CharacterCard({
  character,
  disableCard,
  isSelected,
  handleSelectCharacter,
}: CharacterCardProps) {
  return (
    <div
      onClick={() => {
        if (!disableCard) {
          handleSelectCharacter(character);
        }
      }}
      className={`flex w-full  rounded-lg border-2 cursor-pointer transition duration-200 ${
        disableCard ? "filter grayscale bg-green-700 cursor-not-allowed" : "hover:shadow-md hover:shadow-neutral-300"
      } ${isSelected ? "shadow-md shadow-yellow-600 border-yellow-600 hover:shadow-yellow-600" : "bg-black"}`}
    >
      <Image
        src={character.image}
        alt={`${character.name} image`}
        height="150"
        width="150"
        priority={true}
      />
      <div className="flex flex-col justify-center pl-2 overflow-hidden">
        <span className="text-lg font-bold mb-2 line-clamp-3">
          {character.name}
        </span>
        <div className="flex items-center">
          <span
            className={`h-4 w-4 rounded-full flex-shrink-0 mr-2 ${determineStatusColor(
              character.status
            )}`}
          />
          <span>
            {character.status} - {character.species}
          </span>
        </div>
      </div>
    </div>
  );
}
