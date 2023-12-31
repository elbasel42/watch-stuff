import { AnimeProvider } from "@/app/lib/AnimeProvider";
import Link from "next/link";

const WatchPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const {
    title,
    malI,
    alId,
    image,
    description,
    type,
    url,
    hasSub,
    hasDub,
    totalEpisodes,
    episodes,
  } = await AnimeProvider.fetchAnimeInfo(id);

  console.log(episodes);

  return (
    <main>
      <div className="flex flex-col md:flex-row gap-4 mb-8 rounded-3xl overflow-hidden">
        <img src={image} alt="" className="flex-1" />
        <div>
          <h1 className="text-3xl font-mono">{title.toString()}</h1>
          <p>{description}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {episodes?.map(({ id: episodeId, number, isFiller, url }, index) => {
          return (
            <Link
              href={`/watch/${id}/${index}`}
              className="bg-slate-800 rounded-3xl px-4 py-2"
            >
              <div>Episode {number}</div>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default WatchPage;
