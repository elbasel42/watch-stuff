import { IAnimeResult, ISearch } from "@consumet/extensions";
import { AnimeProvider } from "../lib/AnimeProvider";
import { CardsContainer } from "../components/CardsContainer";
import { Card } from "../components/Card";

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
            url={`/watch/${s.id}`}
            imageUrl={s.image ?? ""}
            title={s.title.toString()}
          />
        );
      })}
    </CardsContainer>
  );
};

export default SearchPage;
