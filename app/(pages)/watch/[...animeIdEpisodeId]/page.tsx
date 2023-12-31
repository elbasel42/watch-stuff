"use client";

import { getEpisodeSources } from "@/app/actions/getEpisodeSources";
import { AppPlayer } from "@/app/components/AppPlayer";
import { useEffect, useState } from "react";

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
  const episodeId = animeIdEpisodeId[1];
  const episodeNum = animeIdEpisodeId[2];
  const validEpisodeId = episodeId.replaceAll("%24", "$");

  const [episodeSources, setSources] = useState<any>([]);
  const [episodeSubtitles, setSubtitles] = useState<any>([]);

  const loadEpisode = async () => {
    const episodeSources = await getEpisodeSources(validEpisodeId);
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
      <h1>Episode {episodeNum}</h1>
      <h2>{validEpisodeId}</h2>
      <div>
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
    </main>
  );
};

export default WatchEpisodePage;
