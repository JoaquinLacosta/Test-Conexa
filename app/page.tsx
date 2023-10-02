import CombineButton from "./components/CombineButton/CombineButton";
import EpisodesSection from "./components/EpisodeSection/EpisodesSection";
import CharactersSection from "./components/CharactersSection/CharactersSection";

export default function Home() {
  return (
    <main data-testid="home-page">
      <CharactersSection />
      <CombineButton />
      <EpisodesSection />
    </main>
  );
}
