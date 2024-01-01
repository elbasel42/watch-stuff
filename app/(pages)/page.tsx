import { AnimeProvider } from "@/app/lib/AnimeProvider";
import { CardsContainer } from "../components/CardsContainer";
import { Card } from "../components/Card";

const Home = async () => {
  const { currentPage, hasNextPage, results } =
    await AnimeProvider.fetchRecentEpisodes();

  return (
    <main>
      <CardsContainer>
        {results.map(({ id, image, title, url, episode }) => {
          return (
            <Card
              url={`/anime/${id}`}
              imageUrl={image ?? ""}
              title={title.toString()}
            />
          );
        })}
      </CardsContainer>
    </main>
  );
};

export default Home;
