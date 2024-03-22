import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";
export default function TvSeasons({ seasons }) {
  const { theme } = useSelector((store) => store.theme);
  return (
    <section
      className={`transition-all duration-300  ${theme === "dark" ? "bg-[#1c1c1c] text-white" : "bg-[#f4f4f4] text-black"} p-[24px] ease-in-out`}
    >
      <div className="mx-auto w-[90%]">
        <h2 className="mb-[24px] text-[32px]">Seasons</h2>
        <ul className="">
          {seasons?.slice(0, 4).map((season) => {
            return (
              <li key={season?.id} className="mb-16 flex gap-4">
                <img
                  className="aspect-[2/3] w-1/6"
                  src={`${import.meta.env.VITE_TMDB_IMG_PATH}${season.poster_path}`}
                />
                <div className="space-y-8">
                  <div>
                    <b className="text-6xl">{season?.name}</b>
                    <p className="mt-8 flex items-center justify-start gap-x-4 text-3xl">
                      <span
                        className={`rounded-full px-4 py-1 transition-all duration-300 ease-in-out ${theme === "dark" ? "bg-[#f4f4f4] text-[#1c1c1c]" : "bg-[#1c1c1c] text-white"}`}
                      >
                        ⭐{season?.vote_average}
                      </span>
                      <GoDotFill />
                      <span>
                        {season?.air_date !== null ? (
                          <span>
                            {new Date(season?.air_date).getFullYear() || "-"}
                          </span>
                        ) : (
                          <span>UNKNOWN</span>
                        )}
                      </span>
                      <GoDotFill />
                      <span>
                        {season?.episode_count + " " + "Episodes" || "-"}
                      </span>
                    </p>
                  </div>
                  <p className="text-2xl leading-[1.5]">{season?.overview}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

TvSeasons.propTypes = {
  seasons: PropTypes.array,
};
