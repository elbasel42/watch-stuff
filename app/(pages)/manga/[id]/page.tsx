import { MangaProvider } from "@/app/lib/MangaProvider";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const MangaPage = async ({ params }: Props) => {
  const { id } = params;

  const {
    title,
    chapters,
    description,
    genres,
    links,
    altTitles,
    authors,
    characters,
    image,
    malId,
    recommendations,
    releaseDate,
    status,
  } = await MangaProvider.fetchMangaInfo(id);

  return (
    <div>
      <img src={image} alt="" />
      <h1 className="text-3xl text-center font-mono">{title.toString()}</h1>
      {/* <p>{description?.length}</p> */}
      {chapters
        ?.toReversed()
        .map(({ id: chapterId, title, pages, releaseDate, volume }, index) => {
          return (
            <Link href={`/read/${id}/${chapterId}`}>
              <h2>Chapter {index}</h2>
            </Link>
          );
        })}
    </div>
  );
};

export default MangaPage;
