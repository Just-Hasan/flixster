import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function MovieItem({ movie, type, inRef }) {
  const mediaType = movie?.media_type;

  const hasPoster =
    movie?.poster_path &&
    `https://image.tmdb.org/t/p/original/${movie?.poster_path}`;

  return (
    <Link
      to={`/${mediaType || type}/selected?title=${
        movie?.original_title || movie?.name
      }&type=${mediaType || type}&id=${movie?.id}`}
      key={movie?.id}
      className="overflow-hidden "
    >
      <div className={`relative h-full w-full`}>
        <img
          src={hasPoster}
          alt="image not found"
          className="aspect-[2/3] object-contain"
        />
      </div>
    </Link>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  inRef: PropTypes.any,
  type: PropTypes.string.isRequired,
};
