// "use client";

import Link from "next/link";
import { AnimeProvider } from "@/app/lib/AnimeProvider";

const Home = async () => {
  const { currentPage, hasNextPage, results } =
    await AnimeProvider.fetchRecentEpisodes();

  return (
    <main className="px-4 py-2">
      <form action="/search">
        <input
          type="search"
          name="query"
          id="query"
          className="block w-full font-mono text-xl px-4 py-2 mb-4 border border-black rounded-3xl"
        />
      </form>
      <div className="grid grid-cols-4 gap-5">
        {results.map(({ id, image, title, url, episode }) => {
          return (
            <a href={`/watch/${id}`}>
              <div>
                <img src={image} alt="" width={320} height={320} className="block w-28 h-28"/>
                <h3>{title.toString()}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
