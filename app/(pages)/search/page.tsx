import { Card } from "@/app/components/Card";
import { CardsContainer } from "@/app/components/CardsContainer";
import { AnimeProvider } from "@/app/lib/AnimeProvider";

interface SearchParams {
  searchParams: {
    query: string;
  };
}

const SearchPage = async ({ searchParams }: SearchParams) => {
  const { query } = searchParams;

  const searchResults = await AnimeProvider.search(query);
  const { currentPage, hasNextPage, totalPages, results } = searchResults;
  const resultList = [...results];

  return (
    <CardsContainer>
      {resultList.map((s) => {
        return (
          <Card
            url={`/anime/${s.id}`}
            imageUrl={s.image ?? ""}
            title={s.title.toString()}
          />
        );
      })}
    </CardsContainer>
  );
};

export default SearchPage;
