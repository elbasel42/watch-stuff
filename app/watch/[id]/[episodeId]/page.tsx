import { AppPlayer } from "@/app/components/AppPlayer";
import { AnimeProvider } from "@/app/lib/AnimeProvider";
import "@vime/core/themes/default.css";

const EpisodePage = async ({ params }: { params: { episodeId: string } }) => {
  const { episodeId } = params;
  const validEpisodeId = episodeId.replaceAll("%24", "$");
  const { sources, intro, outro, subtitles, download, embedURL } = await AnimeProvider.fetchEpisodeSources(validEpisodeId);
  console.log({sources, intro, outro, subtitles, download })
  const englishSubtitle = subtitles?.at(0)
  

  return (
    <>
      <h1>{validEpisodeId}</h1>
      <div>
        {sources.map(({ url, isM3U8, isDASH, quality, size }) => {
          const proxyUrl = `https://m3u8-proxy-cors-hazel.vercel.app/cors?url=${url}`
          console.log({quality, size})
          return (
            <div className="border border-black">
              <h2>URL: {url}</h2>
              <p>isM3U8: {isM3U8 ? "true" : "false"}</p>
              <p>isDASH: {isDASH ? "true" : "false"}</p>
              <div className="flex justify-center">
                <AppPlayer url={proxyUrl} subtitleUrl={englishSubtitle?.url}/> 
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EpisodePage;
