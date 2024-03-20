import PropTypes from "prop-types";
import logo from "../../../public/tmdb_logo.svg";
export default function WatchSection({
  theme,
  movieProvider,
  movieStreamLink,
}) {
  //   const { link, flatrate } = movieProvider;
  console.log(movieProvider);
  return (
    <section
      className={`transition-all duration-300  ${theme === "dark" ? "bg-[#1c1c1c] text-white" : "bg-[#f4f4f4] text-black"} p-[24px] ease-in-out`}
    >
      <div className="mx-auto w-[90%]">
        <h2 className="mb-[24px] text-[32px]">Watch</h2>
        {movieProvider ? (
          <ul className="ml-0 flex  w-max items-start justify-start">
            {movieProvider?.flatrate?.map((stream) => {
              return (
                <li
                  key={stream.provider_name}
                  className="relative p-4 text-[16px]"
                >
                  <a
                    href={movieProvider?.link}
                    target="_blank"
                    className="flex flex-col items-center gap-y-4"
                  >
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_PATH}${stream.logo_path}`}
                      alt={`${movieProvider?.provider_name}`}
                      className="h-[70px] w-[70px]"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <a href={movieStreamLink} target="_blank">
            <img src={logo} className="w-[200px]" />
          </a>
        )}
      </div>
    </section>
  );
}

WatchSection.propTypes = {
  theme: PropTypes.string,
  movieProvider: PropTypes.object,
  movieStreamLink: PropTypes.any,
};
