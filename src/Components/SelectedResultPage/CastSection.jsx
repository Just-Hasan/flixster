import PropTypes from "prop-types";

export default function CastSection({ movieCredits }) {
  return (
    <section className="bg-[#032440] p-[24px]">
      <div className="mx-auto w-[90%]">
        <h2 className="mb-[24px] text-[32px] text-white">Cast</h2>
        <ul className="grid grid-cols-6 gap-8">
          {movieCredits?.cast?.slice(0, 6).map((cast) => {
            return (
              <li key={cast.id} className="relative">
                <img
                  className="aspect-[2/3] object-cover"
                  src={`${import.meta.env.VITE_TMDB_IMG_PATH}${cast.profile_path}`}
                ></img>
                <p className="pt-8 text-3xl font-semibold text-white">
                  {cast.name}
                </p>
                <p className="pt-1 text-2xl font-semibold text-gray-400">
                  {cast.character}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

CastSection.propTypes = {
  movieCredits: PropTypes.obj,
};
