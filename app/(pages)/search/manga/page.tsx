import { Card } from "@/app/components/Card";
import { CardsContainer } from "@/app/components/CardsContainer";
import { MangaProvider } from "@/app/lib/MangaProvider";

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
      <CardsContainer>
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
            // console.log({ image });
            return (
              <Card
                title={title.toString()}
                imageUrl={image ?? ""}
                key={id}
                url={`/manga/${id}`}
              />
            );
          }
        )}
      </CardsContainer>
    </main>
  );
};

export default MangaSearchPage;
