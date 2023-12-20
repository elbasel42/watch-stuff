// "use client";

import { ANIME } from "@consumet/extensions";
import Link from "next/link";

const Zoro = new ANIME.Zoro();

const Home = async () => {
  const { currentPage, hasNextPage, results } =
    await Zoro.fetchRecentEpisodes();

  // const searchResults = Zoro.search('Faraway Paladin');
  return (
    <main className="grid grid-cols-4 gap-5">
      {results.map(({ id, image, title, url, episode }) => {
        return (
          <Link href={`/watch/${id}`}>
          <div>
            <img src={image} alt="" />
            <h3>{title.toString()}</h3>
          </div>
          </Link>
        );
      })}
    </main>
  );
};

export default Home;
