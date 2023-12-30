import { IAnimeResult, ISearch } from "@consumet/extensions";
import { AnimeProvider } from "../lib/AnimeProvider";
import Link from "next/link";

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
    <div className="grid grid-cols-5 gap-5">
      {resultList.map((s) => {
        return (
          <div>
            <Link href={`watch/${s.id}`}>
              <img
                src={s.image}
                alt=""
                width={320}
                height={320}
                className="w-28 object-cover"
              />
              <h2>{s.title.toString()}</h2>
              {/* <p>{s.id}</p> */}
              <p>{s.rating}</p>
              <p>{s.releaseDate}</p>
              <p>{s.status}</p>
              <p>{s.type}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchPage;
