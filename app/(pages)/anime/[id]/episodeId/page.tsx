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
// export const dynamic = "force-dynamic";
// export const revalidate = 0;
// export const fetchCache = "force-no-store";

const EpisodePage = ({ params }: { params: { episodeId: string } }) => {
  const [episodeSources, setSources] = useState<any>([]);
  const [episodeSubtitles, setSubtitles] = useState<any>([]);

  const { episodeId } = params;
  const validEpisodeId = episodeId.replaceAll("%24", "$");

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
    <>
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
    </>
  );
};

export default EpisodePage;
