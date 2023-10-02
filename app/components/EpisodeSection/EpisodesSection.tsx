"use client"

import {
  getCommonCharactersEpisodes,
  getEpisodesIds,
  getPopulatedCharacterEpisodes,
} from "@/app/common/parseEpisodesIds";
import EpisodesList from "../EpisodesList/EpisodesList";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

export default function EpisodesSection() {
  const { firstCharacter, secondCharacter } = useSelector(
    (state: RootState) => state.charactersReducer
  );
  const { episodes, showEpisodesSection, loadingEpisodes } = useSelector(
    (state: RootState) => state.episodesReducer
  );
  return (
    firstCharacter &&
    secondCharacter &&
    showEpisodesSection ? (
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
    ) : null
  );
}
