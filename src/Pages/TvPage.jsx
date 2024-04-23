import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchDiscoverTv } from "../api/tmdb";
import { getTheme } from "../Global/ThemeSlice";
import MovieItem from "../ui/MovieItem";
import SortBy from "../ui/SortBy";
import Pagination from "../ui/Pagination";
import MovieItemSkeleton from "../ui/skeleton/MovieItemSkeleton";
export default function TvPage() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort_by");
  const pageNum = searchParams.get("page");

  const { data, isPending } = useQuery({
    queryKey: ["tv", { sort, pageNum }],
    queryFn: () => fetchDiscoverTv(pageNum, sort),
    keepPreviousData: true,
  });
  //   const tvDetails = useSelector(getTvShow);
  const theme = useSelector(getTheme);
  const tvs = data?.results ?? [];
  const total_pages = data?.total_pages ?? 0;
  const total_results = data?.total_results ?? 0;

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
        {isPending && <MovieItemSkeleton type="multiple" count={20} />}
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
