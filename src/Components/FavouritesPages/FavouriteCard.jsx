import PropType from "prop-types";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { getTheme } from "../../Global/ThemeSlice";
export default function FavouriteCard({ movie }) {
  const genres = movie.genres.map((genre) => genre.name);
  const theme = useSelector(getTheme);

  return (
    <Link
      className={`flex ${theme === "dark" ? "bg-stone-50 text-black" : "bg-blueNight text-white"} `}
      to={`/${movie?.type}/selected?title=${movie?.title}&type=${movie?.type}&id=${movie?.id}`}
    >
      <div className="relative p-2">
        <img className="w-[200px]" src={movie.posterImg}></img>
      </div>
      <div className="flex w-full flex-col gap-y-4 p-4">
        <p className="text-3xl leading-[1.5] ">{movie.title}</p>
        <p className="flex gap-x-4">
          {genres.map((genre, i) => (
            <span
              key={i}
              className={`rounded-full p-2 text-xl  ring-2 ${theme === "dark" ? "ring-gray-900" : "ring-white"}`}
            >
              {genre}
            </span>
          ))}
        </p>
        <Rating
          defaultValue={movie.rating}
          readOnly
          precision={0.5}
          max={10}
          size="large"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "2.4rem",
            },
            "& .MuiRating-iconEmpty": {
              color: theme === "dark" ? "#032440" : "#fee715", // Yellow outline for empty stars
            },
            "& .MuiRating-iconFilled": {
              color: theme === "dark" ? "#032440" : "#fee715", // Red filled stars
            },
          }}
        />
        <blockquote className="w-full  pt-4 text-left text-3xl leading-[1.5]">
          <i>&quot;{movie?.reviews}</i>&quot;
        </blockquote>
      </div>
    </Link>
  );
}

FavouriteCard.propTypes = {
  movie: PropType.object,
};
