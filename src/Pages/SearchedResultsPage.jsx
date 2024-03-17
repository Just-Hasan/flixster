import { useSelector } from "react-redux";
import MovieItem from "../Components/MovieItem";
import { useSearchParams } from "react-router-dom";

export default function SearchedResultsPage() {
  const { searched } = useSelector((store) => store.navbar);
  const { theme } = useSelector((store) => store.theme);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("query");
  console.log(searched);
  return (
    <div
      className={`pb-24 pt-48 ${
        theme === "dark" ? "text-[#f4f4f4]" : "text-black"
      } mx-auto w-[90%] bg-transparent transition-all duration-300 ease-in-out `}
    >
      <h2 className="pb-[32px] text-[24px]">
        Found {searched.length} results for <b>{query}</b>
      </h2>
      <ul className="grid grid-cols-5 gap-8">
        {searched.map((movie) => {
          return (
            <MovieItem
              movie={movie}
              type={movie.media_type}
              key={movie.id}
            ></MovieItem>
          );
        })}
      </ul>
    </div>
  );
}
