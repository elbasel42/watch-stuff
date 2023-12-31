"use client";

import { getAnimeInfo } from "@/app/actions/getAnimeInfo";
import { getEpisodeSources } from "@/app/actions/getEpisodeSources";
import { AppPlayer } from "@/app/components/AppPlayer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBackward, FaForward } from "react-icons/fa";

interface EpisodeSource {
  url: string;
  isM3U8: boolean;
  isDASH: boolean;
  size: number;
  quality: string;
}

const WatchEpisodePage = ({
  params,
}: {
  params: { animeIdEpisodeId: string[] };
}) => {
  const { animeIdEpisodeId } = params;
  const animeId = animeIdEpisodeId[0];
  const episodeNum = +animeIdEpisodeId[1];

  const [episodeSources, setSources] = useState<any>([]);
  const [episodeSubtitles, setSubtitles] = useState<any>([]);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [animeTitle, setAnimeTitle] = useState("");

  const loadEpisode = async () => {
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
    } = await getAnimeInfo(animeId);

    setAnimeTitle(title.toString());

    const episodeToWatch = episodes?.at(episodeNum);
    const episodeId = episodeToWatch?.id;

    if (!episodeId) return;
    const episodeSources = await getEpisodeSources(episodeId);
    const { sources, intro, outro, subtitles, download, embedURL } =
      episodeSources;
    setSources(sources);
    setSubtitles(subtitles);
  };

  useEffect(() => {
    loadEpisode();
  }, []);

  if (!episodeSources) return;
  if (!episodeSubtitles) return;

  return (
    <main>
      <h1 className="text-3xl text-center font-mono">
        {animeTitle} Episode {episodeNum + 1}
      </h1>
      <div className="flex justify-center items-stretch gap-5">
        <button className="border border-white rounded-tl-3xl rounded-bl-3xl">
          <Link
            href={`/watch/${animeId}/${episodeNum - 1}`}
            className="px-4 py-2 md:px-8 md:py-4 flex items-center justify-center"
          >
            <FaBackward />
          </Link>
        </button>
        <div className="flex-1 w-1/2">
          {episodeSources.map(
            (
              { url, isM3U8, isDASH, quality, size }: EpisodeSource,
              index: number
            ) => {
              if (index > 0) return;
              const proxyUrl = `https://m3u8-proxy-cors-hazel.vercel.app/cors?url=${url}`;
              return (
                <div className="flex justify-center">
                  <AppPlayer url={proxyUrl} subtitles={episodeSubtitles} />
                </div>
              );
            }
          )}
        </div>
        <button className="border border-white rounded-tr-3xl -rounded-br-3xl flex items-stretch">
          <Link
            href={`/watch/${animeId}/${episodeNum + 1}`}
            className="px-4 py-2 md:px-8 md:py-4 flex items-center justify-center"
          >
            <FaForward />
          </Link>
        </button>
      </div>
    </main>
  );
};

export default WatchEpisodePage;
