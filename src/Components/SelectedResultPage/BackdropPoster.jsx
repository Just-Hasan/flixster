import PropTypes from "prop-types";
export default function BackdropPoster({ backdrop_path }) {
  return (
    <div className="relative h-[35vh] w-full">
      <img
        src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
        className="h-full w-full object-cover"
        alt=""
      />
    </div>
  );
}

BackdropPoster.propTypes = {
  backdrop_path: PropTypes.string,
};
