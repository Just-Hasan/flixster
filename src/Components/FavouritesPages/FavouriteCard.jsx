import PropType from "prop-types";
export default function FavouriteCard({ movie }) {
  const genres = movie.genres.map((genre) => genre.name);
  console.log(genres);
  return (
    <li className="flex bg-blueNight">
      <div>
        <img className="w-[150px]" src={movie.posterImg}></img>
      </div>
      <div className="p-4">
        <p className="mb-4 text-3xl leading-[1.5] text-white">{movie.title}</p>
        <p className="flex gap-x-4">
          {genres.map((genre, i) => (
            <span
              key={i}
              className="rounded-full p-2 text-xl text-white ring-2 ring-white"
            >
              {genre}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

FavouriteCard.propTypes = {
  movie: PropType.object,
};
