import PropTypes from "prop-types";
export default function MovieItem({ movie }) {
  return (
    <li key={movie.id} className="overflow-hidden rounded-md">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="aspect-[2/3]"
      />
    </li>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
