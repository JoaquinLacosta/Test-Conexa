"use client";

import PlusIcon from "@/app/assets/PlusIcon";
import { getEpisodesIds } from "@/app/common/parseEpisodesIds";
import {
  setEpisodes,
  setLoadingEpisodes,
  setShowEpisodesSection,
} from "@/app/redux/reducers/episodesReducer";
import { RootState } from "@/app/redux/store";
import { getEpisodes } from "@/app/services/episodeService";
import { useDispatch, useSelector } from "react-redux";

export default function CombineButton() {
  const dispatch = useDispatch();
  const { firstCharacter, secondCharacter } = useSelector(
    (state: RootState) => state.charactersReducer
  );
  const { loadingEpisodes } = useSelector(
    (state: RootState) => state.episodesReducer
  );
  const disableButton = !firstCharacter || !secondCharacter || loadingEpisodes;

  const fetchEpisodes = async () => {
    const firstCharacterEpisodes = firstCharacter
      ? getEpisodesIds(firstCharacter)
      : [];
    const secondCharacterEpisodes = secondCharacter
      ? getEpisodesIds(secondCharacter)
      : [];
    dispatch(setLoadingEpisodes(true));
    dispatch(setShowEpisodesSection(true));
    await getEpisodes([...firstCharacterEpisodes, ...secondCharacterEpisodes])
      .then((response) => {
        dispatch(setEpisodes(response));
      })
      .finally(() => {
        const episodesElement = document.getElementById("episodes-section");
        dispatch(setLoadingEpisodes(false));
        episodesElement?.scrollIntoView({ behavior: "smooth" });
      });
  };

  return (
    <button
      disabled={disableButton}
      onClick={fetchEpisodes}
      className={`text-black relative block font-bold mx-auto mt-4 rounded-full lg:absolute lg:text-center lg:-translate-x-1/2 lg:left-1/2 lg:mx-auto lg:-top-1 ${
        disableButton ? "bg-white" : "bg-green-500"
      }`}
    >
      <PlusIcon disabled={disableButton} />
    </button>
  );
}
