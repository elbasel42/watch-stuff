// "use client";

import Link from "next/link";
import { AnimeProvider } from "@/app/lib/AnimeProvider";


const Home = async () => {
  const { currentPage, hasNextPage, results } =
    await AnimeProvider.fetchRecentEpisodes();

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
