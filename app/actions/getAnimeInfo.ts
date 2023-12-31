"use server";

import { AnimeProvider } from "../lib/AnimeProvider";

export const getAnimeInfo = async (animeId: string) => {
    const animeInfo = await AnimeProvider.fetchAnimeInfo(animeId)
    return animeInfo

}