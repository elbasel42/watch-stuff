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
      <h1>{title.toString()}</h1>
      <h2>{id}</h2>
      <img src={image} alt="" />
      <p>{description}</p>
      <ul>
        {episodes?.map(({ id: episodeId, number, isFiller, url }) => {
          return (
            <Link href={`/watch/${id}/${episodeId}`}>
              <div>Episode {number}</div>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default WatchPage;
