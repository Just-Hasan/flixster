import { useSelector, useDispatch } from "react-redux";
import {
  getMovieData,
  getMovieVideo,
  getMovieCredits,
} from "../Global/SelectedMovieSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
export default function SelectedResultPage() {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { theme } = useSelector((store) => store.theme);
  const { movieData, movieVids, movieCredits } = useSelector(
    (store) => store.selected_movie
  );
  const id = searchParam.get("id");
  const type = searchParam.get("type");

  const {
    title,
    media_type,
    backdrop_path,
    budget,
    genres,
    name,
    original_title = title,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
  } = movieData;

  useEffect(() => {
    dispatch(getMovieData(id, type));
  }, [dispatch, id, type]);

  useEffect(() => {
    dispatch(getMovieVideo(id, type));
  }, [id, type, dispatch]);

  useEffect(() => {
    dispatch(getMovieCredits(id, type));
  }, [id, type, dispatch]);

  const genre = genres?.map((genre) => genre.name);
  console.log(movieData);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full h-[35vh] relative">
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
      <div className="w-[80%] mx-auto grid grid-cols-2 ">
        <div className="w-1/2 justify-self-center  translate-y-[-20%]">
          <img src={`${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}}`} />
          <blockquote className="text-center pt-[24px] text-[16px]">
            &quot;{tagline}&quot;
          </blockquote>
        </div>
        <div className="p-4">
          <h2 className="text-[42px] font-bold mb-[16px]">{title || name}</h2>
          <p className="text-2xl mb-[32px] flex gap-4">
            {genre?.map((type) => (
              <span
                key={type}
                className={`p-4 border-2 ${
                  theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
                } rounded-full`}
              >
                {type}
              </span>
            ))}
          </p>
          <p className="text-[18px] leading-[1.4]">{overview}</p>
        </div>
      </div>
    </div>
  );
}
