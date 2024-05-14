import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieItemSkeleton from "./skeleton/MovieItemSkeleton";
import { useQueryClient } from "@tanstack/react-query";

export default function MovieItem({ movie, type }) {
  const queryClient = useQueryClient();
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
      className="overflow-hidden"
    >
      <div className={`relative h-full w-full`}>
        <LazyLoadImage
          alt="Image not found"
          src={hasPoster}
          placeholder={<MovieItemSkeleton type="single"></MovieItemSkeleton>}
          height={"100%"}
          width={"100%"}
        />
      </div>
    </Link>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  array: PropTypes.array,
};
