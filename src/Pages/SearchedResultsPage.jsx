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
      className={`pt-48 pb-24 ${
        theme === "dark" ? "text-[#f4f4f4]" : "text-black"
      } w-[90%] mx-auto transition-all duration-300 bg-transparent ease-in-out`}
    >
      <h2 className="text-[24px] pb-[32px]">
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
