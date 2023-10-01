import { useDispatch, useSelector } from "react-redux";
import {
  addCharacters,
  setCurrentPage,
  setFirstCharacterPage,
  setLoadingCharacters,
  setLoadingFirstCharacterList,
  setLoadingSecondCharacterList,
  setPaginationInfo,
  setSecondCharacterPage,
} from "../redux/reducers/charactersReducer";
import { RootState } from "../redux/store";
import { getCharacters } from "../services/characterService";
import {
  getEpisodesIdsToFetch,
} from "../common/parseEpisodesIds";
import {
  addEpisodes,
  setLoadingEpisodes,
  setShowEpisodesSection,
} from "../redux/reducers/episodesReducer";
import { getEpisodes } from "../services/episodeService";

export default function useFetch() {
  const dispatch = useDispatch();
  const { characters } = useSelector(
    (state: RootState) => state.charactersReducer
  );

  const fetchCharacters = async (
    paginationNumber: number,
    page: number
  ): Promise<void> => {
    dispatch(setCurrentPage(page));
    if (paginationNumber === 1) {
      dispatch(setFirstCharacterPage(page));
    } else {
      dispatch(setSecondCharacterPage(page));
    }

    if (!characters[page]) {
      if (paginationNumber === 1) {
        dispatch(setLoadingFirstCharacterList(true));
      } else {
        dispatch(setLoadingSecondCharacterList(true));
      }
      getCharacters()
        .then((data) => {
          dispatch(addCharacters(data.results));
          dispatch(setPaginationInfo(data.info));
        })
        .finally(() => {
          dispatch(setLoadingCharacters(false));
          dispatch(setLoadingFirstCharacterList(false));
          dispatch(setLoadingSecondCharacterList(false));
        });
    }
  };

  const fetchEpisodes = async (): Promise<void> => {
    const episodesToFetch = getEpisodesIdsToFetch();
    dispatch(setShowEpisodesSection(true));
    if (episodesToFetch.length) {
      dispatch(setLoadingEpisodes(true));
      await getEpisodes(episodesToFetch)
        .then((response) => {
          dispatch(addEpisodes(response));
        })
        .finally(() => {
          const episodesElement = document.getElementById("episodes-section");
          dispatch(setLoadingEpisodes(false));
          episodesElement?.scrollIntoView({ behavior: "smooth" });
        });
    }
  };

  return {
    fetchCharacters,
    fetchEpisodes,
  };
}
