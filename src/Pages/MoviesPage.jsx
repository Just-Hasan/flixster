import { getMoviesData } from "../Global/MoviesPageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import MovieItem from "../ui/MovieItem";
import SortBy from "../Components/MoviesPage/SortBy";
import Pagination from "../Components/MoviesPage/Pagination";
export default function MoviesPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort_by");
  const pageNum = searchParams.get("page");

  const moviePageQuery = useQuery({
    queryKey: ["movie", { sort, pageNum }],
    queryFn: () => dispatch(getMoviesData(sort, pageNum)),
    refetchOnWindowFocus: false,
  });

  const { movies } = useSelector((store) => store.movie);
  console.log(movies);
  const { theme } = useSelector((store) => store.theme);
  console.log(movies.total_pages);

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

      <Pagination
        resultsLength={movies?.results?.length}
        totalPages={movies?.total_pages}
        totalResults={movies?.total_results}
      />
    </div>
  );
}
