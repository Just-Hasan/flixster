import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function MovieItem({ movie: media, type }) {
  return (
    <Link
      to={`/${media.media_type || "movie"}/selected?title=${
        media.original_title || media.name
      }&type=${type}&id=${media.id}`}
      key={media.id}
      className="overflow-hidden "
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
        className="aspect-[2/3]"
      />
    </Link>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
