import { useQuery } from "@tanstack/react-query";
import { fetchUpcoming } from "../../api/tmdb";
import MovieItem from "../../ui/MovieItem";
export default function UpcomingSection() {
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: () => fetchUpcoming(),
  });

  const upcomingMovie = data?.results;
  return (
    <div className="grid grid-cols-4 gap-8">
      {upcomingMovie.map((movie) => {
        return (
          <MovieItem type="movie" movie={movie} key={movie?.id}></MovieItem>
        );
      })}
    </div>
  );
}
