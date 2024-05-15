import { useSelector, useDispatch } from "react-redux";
import MovieItem from "../ui/MovieItem";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { searchMovieOrTv } from "../Global/NavbarSlice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchData } from "../api/tmdb";
import { v4 as RandomID } from "uuid";
import { useInView } from "react-intersection-observer";
import Loader2 from "../ui/Loader2";
import { FaArrowUp } from "react-icons/fa";
export default function SearchedResultsPage() {
  const [, inView] = useInView({ rootMargin: "0px 0px 0px 0px" });
  const { theme } = useSelector((store) => store.theme);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMovieOrTv(query));
  }, [query, dispatch]);

  useEffect(() => {
    if (query === "") {
      navigate("/home");
    }
  }, [query, navigate]);

  console.log(inView);

  /////////////////////////////////////[useInfiniteQuery]
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchStatus,
  } = useInfiniteQuery({
    queryKey: ["show", "searched", { query }],
    queryFn: fetchSearchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // console.log(lastPage, allPage);
      // the returned value from here determined the hasNextPage value
      const nextPage = lastPage?.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const searchedMovieData = data?.pages
    ?.map((item) => item.results?.map((res) => res))
    .flat()
    .map((movie, index, arr) => {
      index < arr.length - 1 ? (
        <MovieItem
          movie={movie}
          index={index}
          array={arr}
          type={movie.media_type}
          key={RandomID()}
        />
      ) : (
        <MovieItem
          movie={movie}
          index={index}
          array={arr}
          type={movie.media_type}
          key={RandomID()}
        />
      );
      // return (
      //   <MovieItem
      //     movie={movie}
      //     index={index}
      //     array={arr}
      //     type={movie.media_type}
      //     key={RandomID()}
      //   />
      // );
    });

  const hasMultiplePage = data?.pages?.length > 1;

  // console.log(data);
  // console.log(searchedMovieData);
  // console.log(fetchStatus);

  if (status === "pending") return <Loader2 />;

  if (status === "error") return <h1>{error.message}</h1>;

  if (fetchStatus && !isFetchingNextPage === "fetching") return <Loader2 />;

  return (
    <div
      className={`pb-24 pt-48 ${
        theme === "dark" ? "text-[#f4f4f4]" : "text-black"
      } mx-auto w-[90%] bg-transparent transition-all duration-300 ease-in-out `}
    >
      <h2 className="pb-[32px] text-[24px]">
        All results for <b>{query}</b>
      </h2>

      <ul className="grid grid-cols-5 gap-8">
        {searchedMovieData}
        {/* <p style={{ opacity: "0%" }} ref={ref}>
          end data
        </p> */}
      </ul>

      {isFetchingNextPage && (
        <h2 className="text-center text-2xl">Loading...</h2>
      )}

      {hasMultiplePage && !hasNextPage && (
        <h2 className="mt-12 text-center text-2xl">
          You&apos;ve reach the end of pages
        </h2>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[7%] opacity-0 ${hasMultiplePage && "opacity-100"} right-[5%] rounded-full bg-red-500 p-4 text-2xl transition-all duration-300 ease-in-out`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
