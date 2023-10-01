import { store } from "../redux/store";

export const getCharacters = async () => {
  const { currentPage } = store.getState().charactersReducer;
  return await fetch(
    "https://rickandmortyapi.com/api/character?" +
      new URLSearchParams({ page: currentPage.toString() }),
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((data) => data);
};
