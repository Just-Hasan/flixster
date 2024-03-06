import PropTypes from "prop-types";
export default function PopularItem({ movie }) {
  return (
    <li key={movie.id} className="overflow-hidden ">
      <img
        src={`${import.meta.env.VITE_TMBD_IMG_PATH}/${movie.poster_path}`}
        className="aspect-[2/3]"
      />
    </li>
  );
}

PopularItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
