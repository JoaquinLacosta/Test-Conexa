"use client"

import { RootState } from "@/app/redux/store";
import Accordion from "../Accordion/Accordion";
import CharacterList from "../CharacterList/CharacterList";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import useSelectCharacters from "@/app/hooks/useSelectCharacters";
import useFetch from "@/app/hooks/useFetch";
import { useEffect, useRef } from "react";
import { setLoadingCharacters } from "@/app/redux/reducers/charactersReducer";

export default function CharactersSection() {
  const {
    firstCharacter,
    secondCharacter,
    characters,
    firstCharacterPage,
    secondCharacterPage,
    paginationInfo,
    loadingFirstCharacterList,
    loadingSecondCharacterList,
  } = useSelector((state: RootState) => state.charactersReducer);
  const dispatch = useDispatch();
  const dataFetchRef = useRef(false);
  const { fetchCharacters } = useFetch();
  const {
    handleSelectFirstCharacter,
    handleSelectSecondCharacter,
    disableCharacterCard,
    isCharacterCardSelected,
  } = useSelectCharacters();

  const fetchData = (paginationNumber: number, page: number): void => {
    dataFetchRef.current = true;
    fetchCharacters(paginationNumber, page);
  };

  useEffect(() => {
    if (dataFetchRef.current) return;
    if (!characters[1]) {
      dispatch(setLoadingCharacters(true));
      fetchData(1, 1);
    }
  }, []);
  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-1/2 relative px-3 self-start">
        <Accordion
          title={`Character #1 ${
            firstCharacter ? `(${firstCharacter.name})` : ""
          }`}
          titleClassName="px-2"
        >
          <CharacterList
            handleSelectCharacter={handleSelectFirstCharacter}
            disableCharacterCard={disableCharacterCard}
            isCharacterCardSelected={isCharacterCardSelected}
            listNumber={1}
            characters={characters[firstCharacterPage]}
            loadingCharacters={loadingFirstCharacterList}
          />
          <PaginationButtons
            currentPage={firstCharacterPage}
            fetchData={fetchData}
            paginationInfo={paginationInfo}
            paginationNumber={1}
          />
        </Accordion>
      </div>
      <div className="w-full lg:w-1/2 px-3 self-start">
        <Accordion
          title={`Character #2 ${
            secondCharacter ? `(${secondCharacter.name})` : ""
          }`}
          titleClassName="lg:text-right px-2"
        >
          <CharacterList
            handleSelectCharacter={handleSelectSecondCharacter}
            disableCharacterCard={disableCharacterCard}
            isCharacterCardSelected={isCharacterCardSelected}
            listNumber={2}
            characters={characters[secondCharacterPage]}
            loadingCharacters={loadingSecondCharacterList}
          />
          <PaginationButtons
            currentPage={secondCharacterPage}
            fetchData={fetchData}
            paginationInfo={paginationInfo}
            paginationNumber={2}
          />
        </Accordion>
      </div>
    </div>
  );
}
