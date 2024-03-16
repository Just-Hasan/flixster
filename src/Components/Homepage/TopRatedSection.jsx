import { useSelector } from "react-redux";
import MovieItem from "../MovieItem";

export default function TopRatedSection() {
  const { topRated } = useSelector((store) => store.homepage);
  return (
    <ul className="grid grid-cols-4 gap-8">
      {topRated.slice(5, 13).map((movie) => {
        return (
          <MovieItem movie={movie} type="movie" key={movie.id}></MovieItem>
        );
      })}
    </ul>
  );
}
