import { store } from "../redux/store";
import { Character, Episode } from "./types";

export const getEpisodesIds = (character: Character): number[] => {
  if (!character) return [];
  const episodes = character.episode;
  return episodes.map((episode) => {
    const splittedUrl = episode.split("/");
    return Number(splittedUrl[splittedUrl.length - 1]);
  });
};

export const getPopulatedCharacterEpisodes = (
  episodesIds: number[],
  episodes: Episode[]
): Episode[] => {
  return episodes.filter((episode) => episodesIds.includes(episode.id));
};

export const getCommonCharactersEpisodes = (
  firstCharacter: Character,
  secondCharacter: Character
) => {
  const allEpisodes = store.getState().episodesReducer.episodes;

  const firstCharacterEpisodes = getEpisodesIds(firstCharacter);
  const secondCharacterEpisodes = getEpisodesIds(secondCharacter);
  return allEpisodes.filter(
    (episode) =>
      firstCharacterEpisodes.includes(episode.id) &&
      secondCharacterEpisodes.includes(episode.id)
  );
};
