import { Card } from "@/app/components/Card";
import { CardsContainer } from "@/app/components/CardsContainer";
import { MangaProvider } from "@/app/lib/MangaProvider";
import Link from "next/link";

interface Props {
  searchParams: {
    query: string;
  };
}

const MangaSearchPage = async ({ searchParams }: Props) => {
  const { query } = searchParams;
  const { results, currentPage, hasNextPage, totalPages, totalResults } =
    await MangaProvider.search(query);

  const resultList = [...results];

  return (
    <main>
      <div>
        {resultList.map(
          ({
            id,
            title,
            altTitles,
            description,
            image,
            releaseDate,
            status,
          }) => {
            return (
              <div className="border border-white rounded-3xl my-4 px-4 py-2">
                <Link href={`/manga/${id}`}>
                  <h2>{title.toString()}</h2>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
};

export default MangaSearchPage;
