import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";
import BackdropPosterSkeleton from "../../ui/skeleton/BackdropPosterSkeleton";

export default function BackdropPoster({ backdrop_path }) {
  return (
    <div className="relative h-[35vh] w-full">
      <LazyLoadImage
        src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
        placeholder={<BackdropPosterSkeleton />}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        // placeholderSrc={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
      ></LazyLoadImage>
      {/* <img
        src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
        className="h-full w-full object-cover"
        alt=""
      /> */}
    </div>
  );
}

BackdropPoster.propTypes = {
  backdrop_path: PropTypes.string,
};
