import { MangaProvider } from "@/app/lib/MangaProvider";

interface Props {
  params: {
    mangaIdChapterId: string[];
  };
}

const ReadPage = async ({ params }: Props) => {
  const { mangaIdChapterId } = params;
  const mangaId = mangaIdChapterId[0];
  const chapterId = mangaIdChapterId[1] + '/' + mangaIdChapterId[2];
  console.log({mangaId, chapterId})

  //   const {} = await MangaProvider.fetchMangaInfo(mangaId);
  const pages = await MangaProvider.fetchChapterPages(chapterId);
  console.log({pages})
  return (
    <main>
      {pages.map(({ img, page }) => {
        return (
          <div>
            <img src={img} alt="" />
          </div>
        );
      })}
    </main>
  );
};

export default ReadPage;
