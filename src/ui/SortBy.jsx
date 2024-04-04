import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function SortBy() {
  const { theme } = useSelector((store) => store.theme);
  const [searchParams, setSearchParams] = useSearchParams();

  function updateSortBy(categorie) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", categorie);
    setSearchParams(newParams.toString());
  }

  return (
    <select
      onChange={(e) => updateSortBy(e.target.value)}
      value={searchParams.get("sort_by")}
      className={`${theme === "dark" ? "ring-offset-5 rounded-full bg-white px-4 py-2 text-black outline-none " : " rounded-full bg-black px-4 py-2 text-white outline-none  ring-2 ring-white ring-offset-2"}  text-3xl`}
    >
      <option value="popularity.desc">Popularity</option>
      <option value="vote_count.desc">Vote</option>
      <option value="revenue.desc">Revenue</option>
    </select>
  );
}
