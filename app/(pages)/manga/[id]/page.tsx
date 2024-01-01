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
      {title.toString()}
      <img src={image} alt="" />
      <p>{description?.toString()}</p>
      {chapters?.toReversed().map(({ id: chapterId, title, pages, releaseDate, volume }) => {
        // console.log({id, chapterId})
        return (
          <Link href={`/read/${id}/${chapterId}`}>
            <h2>{title}</h2>
            {/* <p>{pages} pages</p> */}
            {/* <p>{releaseDate}</p> */}
            {/* <p>Volume: {volume}</p> */}
          </Link>
        );
      })}
    </div>
  );
};

export default MangaPage;
