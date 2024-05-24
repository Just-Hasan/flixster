import PropTypes from "prop-types";
import style from "../../Styles/HomepageMovieItem.module.css";
import Button from "../../ui/Button";
import { getGenre } from "../../utils/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieItemSkeleton from "../../ui/skeleton/MovieItemSkeleton";

export default function HomepageMovieItem({ movie }) {
  const genre = getGenre(movie.genre_ids);

  const { id, title } = movie;

  return (
    <li className="relative">
      <LazyLoadImage
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        style={{ maxHeight: "100dvh", width: "100vw" }}
        placeholder={<MovieItemSkeleton type="single" />}
      />
      {/* <img
        className="h-[100%] max-h-[100vh] w-[100vw]"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      /> */}
      <div className={style.gradient}></div>
      <div className="absolute bottom-[15%] left-[5%] flex flex-col items-start gap-[16px] text-left">
        <h2 className="mb-[24px] font-compressed text-[64px] font-semibold text-[#f4f4f4]">
          {movie.title}
        </h2>

        <p className="w-1/2 font-body text-[24px] leading-[1.5] text-[#f4f4f4]">
          {movie.overview}
        </p>
        <p className="mb-[16px] text-[24px] text-[#f4f4f4]">
          Genre :{" "}
          {genre.map((genreMovie, i, arr) => {
            return (
              <span key={i} className="font-bold text-[#fee715]">
                {genreMovie.genre}
                {i < arr.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </p>

        <Button
          to={`/movie/selected?title=${title}&type=movie&id=${id}`}
          type="primary"
        >
          Details
        </Button>
      </div>
    </li>
  );
}

HomepageMovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
