import { ReadMore } from "@/app/components/ReadMore";
import { AnimeProvider } from "@/app/lib/AnimeProvider";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const WatchPage = async ({ params }: Props) => {
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

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 mb-8 overflow-hidden md:flex-row rounded-3xl">
        <img src={image} alt="" className="object-cover object-top w-60 h-80" />
        <div>
          <h1 className="font-mono text-3xl text-center">{title.toString()}</h1>
          <ReadMore text={description ?? ""} className="px-4 py-2"/>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {episodes?.map(({ id: episodeId, number, isFiller, url }, index) => {
          return (
            <Link
              href={`/watch/${id}/${index}`}
              className="px-4 py-2 bg-slate-800 rounded-3xl"
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
