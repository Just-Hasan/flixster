import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";

export default function PopularSection() {
  const { popular } = useSelector((store) => store.homepage);
  return (
    <ul className="grid grid-cols-4 gap-y-16 gap-x-8">
      {popular.slice(6, 14).map((movie) => {
        return <MovieItem movie={movie} key={movie.id}></MovieItem>;
      })}
    </ul>
  );
}
