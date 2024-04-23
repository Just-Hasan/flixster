import MovieItem from "../../ui/MovieItem";
import { useFetchShow } from "./useFetchShow";
import { fetchPopularMovies } from "../../api/tmdb";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";

export default function PopularSection() {
  const { isPending: isLoadingPopularMovies, results: popularMovies } =
    useFetchShow(fetchPopularMovies, "popular_movies");

  return (
    <ul className="grid grid-cols-4 gap-8">
      {isLoadingPopularMovies && <MovieItemSkeleton count={8} />}
      {popularMovies?.slice(6, 14).map((movie) => {
        return (
          <MovieItem movie={movie} type="movie" key={movie.id}></MovieItem>
        );
      })}
    </ul>
  );
}
