import { Episode } from "@/app/common/types";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Accordion from "../Accordion/Accordion";

interface EpisodesListProps {
  episodes: Episode[];
  name: string;
}

export default function EpisodesList({ episodes, name }: EpisodesListProps) {
  const { firstCharacter, secondCharacter } = useSelector(
    (state: RootState) => state.charactersReducer
  );
  return (
    <div data-testid="episodes-list" className="p-3 lg:w-1/3">
      <Accordion
        childrenContainerClassName="overflow-y-scroll max-h-[2rem] lg:max-h-none"
        title={`Episodes of ${name}`}
        titleClassName="px-2"
      >
        {episodes.length ? (
          <ul className="px-2">
            {episodes.map((episode) => (
              <li
                data-testid="episodes-list-item"
                className="flex flex-col mb-4 mx-2 border-b-2 pb-3"
                key={episode.id}
              >
                <span>
                  <strong>Episode: </strong>
                  {episode.episode}
                </span>
                <span>
                  <strong>Name: </strong> {episode.name}
                </span>
                <span>
                  <strong>Air Date: </strong> {episode.air_date}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <span data-testid="episodes-list-empty-state" className="my-2 px-4 block">
            There are no episodes in common between {firstCharacter?.name} and{" "}
            {secondCharacter?.name}
          </span>
        )}
      </Accordion>
    </div>
  );
}
