"use client";

import PlusIcon from "@/app/assets/PlusIcon";
import useFetch from "@/app/hooks/useFetch";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function CombineButton() {
  const { firstCharacter, secondCharacter } = useSelector(
    (state: RootState) => state.charactersReducer
  );
  const { loadingEpisodes } = useSelector(
    (state: RootState) => state.episodesReducer
  );
  const disableButton = !firstCharacter || !secondCharacter || loadingEpisodes;
  const { fetchEpisodes } = useFetch();

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
