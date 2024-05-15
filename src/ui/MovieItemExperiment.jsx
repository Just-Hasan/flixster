import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useBlurImagePlaceholder } from "../hooks/useBlurImagePlaceholder";
import { Blurhash } from "react-blurhash";

export default function MovieItem({ movie, type, movieRef }) {
  const queryClient = useQueryClient();
  const mediaType = movie?.media_type;
  const hasPoster =
    movie?.poster_path &&
    `https://image.tmdb.org/t/p/original/${movie?.poster_path}`;

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie?.poster_path}`;
  const { imageSrc, blurHashString } = useBlurImagePlaceholder(imageUrl);
  if (!movie?.poster_path)
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-3xl text-black">Image not found</p>
      </div>
    );

  return (
    <Link
      to={`/${mediaType || type}/selected?title=${
        movie?.original_title || movie?.name
      }&type=${mediaType || type}&id=${movie?.id}`}
      key={movie?.id}
      className="overflow-hidden"
    >
      <div className={`relative h-full w-full`} ref={movieRef}>
        {!imageSrc && (
          <Blurhash
            hash={blurHashString}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Loaded content"
            style={{ width: "100%" }}
            height={{ height: "100%" }}
          />
        )}
      </div>
    </Link>
  );

  // if (movieRef) {
  //   return (
  //     <Link
  //       to={`/${mediaType || type}/selected?title=${
  //         movie?.original_title || movie?.name
  //       }&type=${mediaType || type}&id=${movie?.id}`}
  //       key={movie?.id}
  //       className="overflow-hidden"
  //     >
  //       <div className={`relative h-full w-full`} ref={movieRef}>
  //         <LazyLoadImage
  //           alt="Image not found"
  //           src={hasPoster}
  //           placeholder={<MovieItemSkeleton type="single"></MovieItemSkeleton>}
  //           height={"100%"}
  //           width={"100%"}
  //         />
  //       </div>
  //     </Link>
  //   );
  // }

  // return (
  //   <Link
  //     to={`/${mediaType || type}/selected?title=${
  //       movie?.original_title || movie?.name
  //     }&type=${mediaType || type}&id=${movie?.id}`}
  //     key={movie?.id}
  //     className="overflow-hidden"
  //   >
  //     <div className={`relative h-full w-full`}>
  //       <LazyLoadImage
  //         alt="Image not found"
  //         src={hasPoster}
  //         placeholder={<MovieItemSkeleton type="single"></MovieItemSkeleton>}
  //         height={"100%"}
  //         width={"100%"}
  //       />
  //     </div>
  //   </Link>
  // );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  movieRef: PropTypes.func,
  array: PropTypes.array,
};
