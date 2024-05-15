import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";

export default function PosterAndTagline({ poster_path, theme, tagline }) {
  const poster = `${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}}`;
  return (
    <div className="w-1/2 translate-y-[-20%]  justify-self-center">
      <LazyLoadImage
        src={poster}
        height="100%"
        width="100%"
        placeholder={<MovieItemSkeleton type="single" />}
        alt="movie poster"
      />
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
