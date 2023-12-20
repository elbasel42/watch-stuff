import { AppPlayer } from "@/app/components/AppPlayer";
import "@vime/core/themes/default.css";
import { AnimeProvider } from "@/app/lib/AnimeProvider";

const EpisodePage = async ({ params }: { params: { episodeId: string } }) => {
  const { episodeId } = params;
  const validEpisodeId = episodeId.replaceAll("%24", "$");
  const { sources } = await AnimeProvider.fetchEpisodeSources(validEpisodeId);

  return (
    <>
      <h1>{validEpisodeId}</h1>
      <div>
        {sources.map(({ url, isM3U8, isDASH }) => {
          return (
            <div className="border border-black">
              <h2>URL: {url}</h2>
              <p>isM3U8: {isM3U8 ? "true" : "false"}</p>
              <p>isDASH: {isDASH ? "true" : "false"}</p>
              <div>
                <AppPlayer url={url}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EpisodePage;
