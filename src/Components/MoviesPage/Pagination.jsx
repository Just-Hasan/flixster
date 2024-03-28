import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
export default function Pagination({
  resultsLength,
  totalPages,
  totalResults,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [initValue, setInitValue] = useState(Number(page));
  const currentPage = Number(searchParams.get("page"));
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

  useEffect(() => {
    if (currentPage < 0) {
      newPage.set("page", 1);
      setInitValue(1);
      setSearchParams(newPage.toString());
    }
  }, [currentPage, newPage, setSearchParams, totalPages]);
  console.log(currentPage > totalPages);
  return (
    <div
      className="mx-auto mt-16 flex w-max gap-x-2 rounded-full text-center text-2xl
     "
    >
      <button
        onClick={handlePrevPage}
        className="rounded-full bg-white px-4 py-2 text-black transition-all duration-200 ease-in-out hover:bg-accent hover:font-semibold"
      >
        &larr; Prev
      </button>
      {testArr.slice(0, 5).map((num) => {
        return (
          <button
            key={num}
            onClick={() => handleChangePage(num)}
            defaultValue={() => searchParams.get("page")}
            className={`rounded-full border-2 ${page === String(num) ? "border-transparent bg-accent text-black" : "text-white"} border-white px-4 py-2 transition-all duration-200 ease-in-out hover:bg-white hover:text-black`}
          >
            {num}
          </button>
        );
      })}
      <button
        onClick={() => handleNextPage()}
        className="rounded-full bg-white px-4 py-2 text-black transition-all duration-200 ease-in-out hover:bg-accent hover:font-semibold"
      >
        Next &rarr;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  resultsLength: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
};
