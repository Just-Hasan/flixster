import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getTheme } from "../Global/ThemeSlice";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { fetchDiscoverMovies } from "../api/tmdb";
export default function Pagination({ resultsLength, totalPages }) {
  const theme = useSelector(getTheme);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [initValue, setInitValue] = useState(Number(page));
  const currentPage = Number(searchParams.get("page"));
  const sortBy = searchParams.get("sort_by");
  const queryClient = useQueryClient();
  const testArr = new Array(resultsLength)
    .fill(initValue)
    .map((num, i) => num + i);

  const newPage = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  function handleChangePage(page_num) {
    newPage.set("page", page_num);
    setSearchParams(newPage.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePrevPage() {
    if (currentPage <= 6) {
      newPage.set("page", 1);
      setInitValue(1);
      setSearchParams(newPage.toString());
    } else {
      newPage.set("page", currentPage - 5);
      setInitValue((num) => num - 5);
      setSearchParams(newPage.toString());
    }
  }

  function handleNextPage() {
    newPage.set("page", currentPage + 5);
    setInitValue((num) => num + 5);
    setSearchParams(newPage.toString());
  }

  function onHoverPrefetch(pageNum) {
    queryClient.prefetchQuery({
      queryKey: ["movie", { sortBy, pageNum }],
      queryFn: () => fetchDiscoverMovies(sortBy, pageNum),
    });
  }

  useEffect(() => {
    if (currentPage < 0) {
      newPage.set("page", 1);
      setInitValue(1);
      setSearchParams(newPage.toString());
    }
  }, [currentPage, newPage, setSearchParams, totalPages]);

  return (
    <div
      className="mx-auto mt-16 flex w-max items-center
      justify-center gap-x-2 rounded-full text-center text-2xl
     "
    >
      <button
        onClick={handlePrevPage}
        className="rounded-full border-2 p-4  transition-all duration-200 ease-in-out hover:font-semibold"
      >
        <FaAngleLeft />
      </button>
      <div className="flex items-center gap-4">
        {testArr.slice(0, 5).map((num) => {
          return (
            <button
              onMouseEnter={() => onHoverPrefetch(num)}
              key={num}
              onClick={() => handleChangePage(num)}
              defaultValue={() => searchParams.get("page")}
              className={`rounded-full border-2 border-gray-200 p-3 transition-all
            duration-200 ease-in-out hover:border-transparent
            ${theme === "dark" ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"}
            ${page === String(num) && "border-transparent bg-accent text-black"}`}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => handleNextPage()}
        className="rounded-full border-2 p-4 transition-all  duration-200 ease-in-out hover:font-semibold"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  resultsLength: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
};
