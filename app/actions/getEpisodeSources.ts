"use server";

import { AnimeProvider } from "../lib/AnimeProvider";

export const getEpisodeSources = async (episodeId: string) => {
  // const { sources, intro, outro, subtitles, download, embedURL } =
  //   await AnimeProvider.fetchEpisodeSources(validEpisodeId);
  const episodeSources = await AnimeProvider.fetchEpisodeSources(episodeId);
  return episodeSources;

  // console.log({ sources, intro, outro, subtitles, download });
};
