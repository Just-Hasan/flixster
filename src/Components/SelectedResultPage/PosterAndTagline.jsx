import PropTypes from "prop-types";

export default function PosterAndTagline({ poster_path, theme, tagline }) {
  return (
    <div className="w-1/2 translate-y-[-20%]  justify-self-center">
      <img src={`${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}}`} />
      {tagline !== "" && (
        <blockquote
          className={`pt-[24px] text-center text-[24px] ${
            theme === "dark" ? "text-[#fee715]" : "text-[#101820]"
          } leading-[1.5]`}
        >
          &quot;{tagline}&quot;
        </blockquote>
      )}
    </div>
  );
}

PosterAndTagline.propTypes = {
  poster_path: PropTypes.string,
  theme: PropTypes.string,
  tagline: PropTypes.string,
};
