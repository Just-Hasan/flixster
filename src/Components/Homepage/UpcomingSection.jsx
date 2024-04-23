import { fetchUpcomingMovies } from "../../api/tmdb";
import MovieItem from "../../ui/MovieItem";
import { useFetchShow } from "./useFetchShow";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";
export default function UpcomingSection() {
  const { isPending: isLoadingUpcomingMovies, results: upcomingMovies } =
    useFetchShow(fetchUpcomingMovies, "upcoming_movies");

  console.log(isLoadingUpcomingMovies);

  return (
    <div className="grid grid-cols-4 gap-8">
      {isLoadingUpcomingMovies && <MovieItemSkeleton count={8} />}
      {upcomingMovies?.slice(0, 8)?.map((movie) => {
        return (
          <MovieItem type="movie" movie={movie} key={movie?.id}></MovieItem>
        );
      })}
    </div>
  );
}
