import PropTypes from "prop-types";
import style from "../../Styles/MovieItem.module.css";
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
    genres.includes(genreObj.id) ? genreObj.genre : ""
  );

  return genre;
}

export default function MovieItem({ movie }) {
  const genre = getGenre(movie.genre_ids);
  return (
    <li className="relative">
      <img
        className="h-[100%] w-[100vw] max-h-[100vh]"
        src={`${import.meta.env.VITE_TMBD_IMG_PATH}${movie.backdrop_path}`}
      />
      <div className={style.gradient}></div>
      <div className="absolute bottom-[15%] left-[5%] flex flex-col gap-[16px] text-left items-start">
        <h2 className="font-semibold text-[#f4f4f4] font-compressed text-[64px] mb-[24px]">
          {movie.title}
        </h2>

        <p className="w-1/2 text-[24px] font-body text-[#f4f4f4] leading-[1.5]">
          {movie.overview}
        </p>
        <p className="text-[#f4f4f4] text-[24px] mb-[16px]">
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
        <button className="text-[24px] bg-[#fee715] p-4 rounded-full text-[#101820] font-semibold">
          Details
        </button>
      </div>
    </li>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
