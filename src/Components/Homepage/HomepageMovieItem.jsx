import PropTypes from "prop-types";
import style from "../../Styles/HomepageMovieItem.module.css";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
const genreData = [
  { id: 28, genre: "Action" },
  { id: 12, genre: "Adventure" },
  { id: 16, genre: "Animation" },
  { id: 35, genre: "Comedy" },
  { id: 80, genre: "Crime" },
  { id: 99, genre: "Documentary" },
  { id: 18, genre: "Drama" },
  { id: 10751, genre: "Family" },
  { id: 14, genre: "Fantasy" },
  { id: 36, genre: "History" },
  { id: 27, genre: "Horror" },
  { id: 10402, genre: "Music" },
  { id: 9648, genre: "Mystery" },
  { id: 10749, genre: "Romance" },
  { id: 878, genre: "Science Fiction" },
  { id: 10770, genre: "TV Movie" },
  { id: 53, genre: "Thriller" },
  { id: 10752, genre: "War" },
  { id: 37, genre: "Western" },
];

function getGenre(genres) {
  const genre = genreData.filter((genreObj) =>
    genres.includes(genreObj.id) ? genreObj.genre : "",
  );

  return genre;
}

export default function HomepageMovieItem({ movie }) {
  const genre = getGenre(movie.genre_ids);

  const { id, title } = movie;

  return (
    <li className="relative">
      <img
        className="h-[100%] max-h-[100vh] w-[100vw]"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      />
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
        {/* <Link
          to={`/movie/selected?title=${title}&type=movie&id=${id}`}
          className="rounded-full bg-[#fee715] p-4 text-[24px] font-semibold text-[#101820]"
        >
          Details
        </Link> */}
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
