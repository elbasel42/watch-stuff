import { Card } from "@/app/components/Card";
import { CardsContainer } from "@/app/components/CardsContainer";
import { AnimeProvider } from "@/app/lib/AnimeProvider";
import { IAnimeResult, ISearch } from "@consumet/extensions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = searchParams;

  const searchResults: ISearch<IAnimeResult> = await AnimeProvider.search(
    query
  );
  const { currentPage, hasNextPage, totalPages, results } = searchResults;
  console.log(searchResults);
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
