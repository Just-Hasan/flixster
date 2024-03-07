import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";

export default function TopRatedSection() {
  const { topRated } = useSelector((store) => store.homepage);
  return (
    <ul className="grid grid-cols-4 gap-y-16 gap-x-8">
      {topRated.slice(5, 13).map((movie) => {
        return <MovieItem movie={movie} key={movie.id}></MovieItem>;
      })}
    </ul>
  );
}
