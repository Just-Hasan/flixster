import { useEffect } from "react";
import { getMoviesData } from "../Global/MoviesPageSlice";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "../ui/MovieItem";
import SortBy from "../Components/MoviesPage/SortBy";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort_by");
  const dispatch = useDispatch();
  const {
    movie: { movies },
    theme: { theme },
  } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getMoviesData(sort));
  }, [dispatch, sort]);

  return (
    <div
      className={`pb-24 pt-48 ${
        theme === "dark" ? "text-[#f4f4f4]" : "text-black"
      } mx-auto w-[90%] bg-transparent transition-all duration-300 ease-in-out `}
    >
      <div className="mb-14 flex items-center justify-between">
        <h2 className="text-[24px]">Movies</h2>
        <SortBy />
      </div>
      <ul className="grid grid-cols-5 gap-4">
        {movies?.results?.map((movie) => {
          return (
            <MovieItem movie={movie} type="movie" key={movie.id}></MovieItem>
          );
        })}
      </ul>
    </div>
  );
}
