import { fetchTopRatedMovies } from "../../api/tmdb";
import MovieItem from "../../ui/MovieItem";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";
import { useFetchShow } from "./useFetchShow";

export default function TopRatedSection() {
  const { isPending: isLoadingTopRatedMovies, results: topRatedMovies } =
    useFetchShow(fetchTopRatedMovies, "top_rated_movies");

  console.log(isLoadingTopRatedMovies);
  return (
    <ul className="grid grid-cols-4 gap-8">
      {isLoadingTopRatedMovies && <MovieItemSkeleton count={8} />}
      {topRatedMovies?.slice(5, 13).map((movie) => {
        return <MovieItem movie={movie} type="movie" key={movie.id} />;
      })}
    </ul>
  );
}
