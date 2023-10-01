"use client";
import { useEffect, useRef } from "react";
import CharacterList from "./components/CharacterList/CharacterList";
import { setLoadingCharacters } from "./redux/reducers/charactersReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import {
  getCommonCharactersEpisodes,
  getEpisodesIds,
  getPopulatedCharacterEpisodes,
} from "./common/parseEpisodesIds";
import CombineButton from "./components/CombineButton/CombineButton";
import EpisodesList from "./components/EpisodesList/EpisodesList";
import useSelectCharacters from "./hooks/useSelectCharacters";
import PaginationButtons from "./components/PaginationButtons/PaginationButtons";
import Accordion from "./components/Accordion/Accordion";
import Spinner from "./components/Spinner/Spinner";
import useFetch from "./hooks/useFetch";

export default function Home() {
  const {
    characters,
    firstCharacterPage,
    paginationInfo,
    secondCharacterPage,
    firstCharacter,
    loadingFirstCharacterList,
    loadingSecondCharacterList,
    secondCharacter,
  } = useSelector((state: RootState) => state.charactersReducer);
  const { episodes, showEpisodesSection, loadingEpisodes } = useSelector(
    (state: RootState) => state.episodesReducer
  );
  const dispatch = useDispatch();
  const dataFetchRef = useRef(false);
  const {
    handleSelectFirstCharacter,
    handleSelectSecondCharacter,
    disableCharacterCard,
    isCharacterCardSelected,
  } = useSelectCharacters();
  const { fetchCharacters } = useFetch();

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
    <main data-testid="home-page">
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
      <CombineButton />
      {firstCharacter && secondCharacter && showEpisodesSection && (
        <div id="episodes-section" className="mt-4 flex flex-col lg:flex-row">
          {loadingEpisodes ? (
            <Spinner />
          ) : (
            <>
              <EpisodesList
                episodes={getPopulatedCharacterEpisodes(
                  getEpisodesIds(firstCharacter),
                  episodes
                )}
                name={firstCharacter.name}
              />
              <EpisodesList
                episodes={getCommonCharactersEpisodes(
                  firstCharacter,
                  secondCharacter
                )}
                name="both characters"
              />
              <EpisodesList
                episodes={getPopulatedCharacterEpisodes(
                  getEpisodesIds(secondCharacter),
                  episodes
                )}
                name={secondCharacter.name}
              />
            </>
          )}
        </div>
      )}
    </main>
  );
}
