import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTheme } from "../Global/ThemeSlice";
import MovieItem from "../ui/MovieItem";
import SortBy from "../ui/SortBy";
import Pagination from "../ui/Pagination";
import { fetchTvShow } from "../Global/TvPageSlice";
export default function TvPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort_by");
  const pageNum = searchParams.get("page");

  const tvQuery = useQuery({
    queryKey: ["tv", { sort, pageNum }],
    queryFn: () => dispatch(fetchTvShow({ page: pageNum, sort })),
    keepPreviousData: true,
  });
  //   const tvDetails = useSelector(getTvShow);
  const theme = useSelector(getTheme);
  const tvs = tvQuery?.data?.payload?.results ?? [];
  const total_pages = tvQuery?.data?.payload?.total_pages ?? 0;
  const total_results = tvQuery?.data?.payload?.total_results ?? 0;

  return (
    <div
      className={`pb-24 pt-48 ${
        theme === "dark" ? "text-[#f4f4f4]" : "text-black"
      } mx-auto w-[90%] bg-transparent transition-all duration-300 ease-in-out `}
    >
      <div className="mb-14 flex items-center justify-between">
        <h2 className="text-[24px]">TV Shows</h2>
        <SortBy />
      </div>
      <ul className="grid grid-cols-5 gap-4">
        {tvs?.map((tv) => {
          return <MovieItem movie={tv} type="tv" key={tv.id}></MovieItem>;
        })}
      </ul>

      <Pagination
        resultsLength={tvs?.length}
        totalPages={total_pages}
        totalResults={total_results}
      />
    </div>
  );
}
