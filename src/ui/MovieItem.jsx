import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieItemSkeleton from "./skeleton/MovieItemSkeleton";
import { useQueryClient } from "@tanstack/react-query";

const fetchStr = [
  "fetchData",
  "fetchCredits",
  "fetchVideo",
  "fetchProvider",
  "fetchSimilar",
];

export default function MovieItem({ movie, type, movieRef }) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const mediaType = movie?.media_type || location.pathname.replace("/", "");
  const hasPoster =
    movie?.poster_path &&
    `https://image.tmdb.org/t/p/original/${movie?.poster_path}`;

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie?.poster_path}`;
  console.log(mediaType);

  function handlePrefetchSelectedMovie() {
    for (let i = 0; i < fetchStr.length; i++) {
      const currentFetch = fetchStr[i];
      queryClient.prefetchQuery({
        queryKey: [
          movie?.original_title || movie?.name,
          mediaType,
          movie?.id,
          currentFetch,
        ],
      });
    }
  }

  if (!movie?.poster_path)
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-3xl text-black">Image not found</p>
      </div>
    );

  if (movieRef) {
    return (
      <Link
        to={`/${mediaType || type}/selected?title=${
          movie?.original_title || movie?.name
        }&type=${mediaType || type}&id=${movie?.id}`}
        key={movie?.id}
        className="overflow-hidden"
      >
        <div className={`relative h-full w-full`} ref={movieRef}>
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

  return (
    <Link
      to={`/${mediaType || type}/selected?title=${
        movie?.original_title || movie?.name
      }&type=${mediaType || type}&id=${movie?.id}`}
      key={movie?.id}
      className="overflow-hidden"
    >
      <div
        className={`relative h-full w-full`}
        onMouseEnter={handlePrefetchSelectedMovie}
      >
        <LazyLoadImage
          alt="Image not found"
          src={hasPoster}
          height={"100%"}
          width={"100%"}
          placeholder={<MovieItemSkeleton type="single"></MovieItemSkeleton>}
        />
      </div>
    </Link>
  );
}
// placeholderSrc={hasPoster}

// placeholder={<MovieItemSkeleton type="single"></MovieItemSkeleton>}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  movieRef: PropTypes.func,
  array: PropTypes.array,
};
