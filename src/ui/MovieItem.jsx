import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function MovieItem(movie) {
  const location = useLocation();
  const mediaType = movie?.type;
  const type = location.pathname.split("/")[1];
  if (type === "show") {
    return (
      <Link
        to={`/${mediaType}/selected?title=${
          movie?.movie.original_title || movie?.movie.name
        }&type=${mediaType}&id=${movie?.movie.id}`}
        key={movie?.movie.id}
        className="overflow-hidden "
      >
        <div className="relative h-full w-full">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.movie.poster_path}`}
            className="aspect-[2/3]"
          />
        </div>
      </Link>
    );
  }
  return (
    <Link
      to={`/${type}/selected?title=${
        movie?.movie.original_title || movie?.movie.name
      }&type=${type}&id=${movie?.movie.id}`}
      key={movie?.movie.id}
      className="overflow-hidden "
    >
      <div className="relative h-full w-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.movie.poster_path}`}
          className="aspect-[2/3]"
        />
      </div>
    </Link>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
