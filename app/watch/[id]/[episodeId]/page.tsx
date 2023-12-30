"use client";

import { getEpisodeSources } from "@/app/actions/getEpisodeSources";
import { AppPlayer } from "@/app/components/AppPlayer";
import { AnimeProvider } from "@/app/lib/AnimeProvider";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const EpisodePage = ({ params }: { params: { episodeId: string } }) => {
  const [episodeSources, setSources] = useState([]);
  const [episodeSubtitles, setSubtitles] = useState([])

  const { episodeId } = params;
  const validEpisodeId = episodeId.replaceAll("%24", "$");

  const loadEpisode = async () => {
    const episodeSources = await getEpisodeSources(validEpisodeId);

    const { sources, intro, outro, subtitles, download, embedURL } =
      episodeSources;
    console.log(sources);
    setSources(sources);
    setSubtitles(subtitles)
  };

  useEffect(() => {
    loadEpisode();
  }, []);

  if (!episodeSources) return;
  if (!episodeSubtitles) return;

  return (
    <>
      <h1>{validEpisodeId}</h1>
      <div>
        {episodeSources.map(({ url, isM3U8, isDASH, quality, size }, index) => {
          if (index > 0) return;
          const proxyUrl = `https://m3u8-proxy-cors-hazel.vercel.app/cors?url=${url}`;
          console.log({ quality, size });
          return (
            <div className="border border-black">
              <h2>URL: {url}</h2>
              <p>isM3U8: {isM3U8 ? "true" : "false"}</p>
              <p>isDASH: {isDASH ? "true" : "false"}</p>
              <div className="flex justify-center">
                {/* <AppPlayer url={proxyUrl} subtitles={subtitles} /> */}
                <AppPlayer url={proxyUrl} subtitles={episodeSubtitles}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EpisodePage;
