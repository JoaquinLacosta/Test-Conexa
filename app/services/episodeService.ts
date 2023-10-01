import { Episode } from "../common/types";

export const getEpisodes = async (episodeIds: number[]): Promise<Episode[]> => {
  return await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`,
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};
