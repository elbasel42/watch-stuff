import { MangaProvider } from "@/app/lib/MangaProvider";

interface Props {
  params: {
    mangaIdChapterId: string[];
  };
}

const ReadPage = async ({ params }: Props) => {
  const { mangaIdChapterId } = params;
  const mangaId = mangaIdChapterId[0];
  const chapterId = mangaIdChapterId[1];
  console.log({ mangaId, chapterId });

  //   const {} = await MangaProvider.fetchMangaInfo(mangaId);
  const pages = await MangaProvider.fetchChapterPages(chapterId);
  console.log({ pages });
  return (
    <main>
      {pages.map(({ img, page }) => {
        const proxyImg = `https://m3u8-proxy-cors-hazel.vercel.app/cors?url=${img}&headers={"referer":"https://mangadex.org","origin":"https://mangadex.org"}`;
        return (
          <div>
            <img src={proxyImg} alt="" className="w-full" />
          </div>
        );
      })}
    </main>
  );
};

export default ReadPage;
