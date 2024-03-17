import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";

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
    (store) => store.selected_movie,
  );
  const id = searchParam.get("id");
  const type = searchParam.get("type");

  const {
    title,
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
    vote_average,
    tagline,
    first_air_date,
    production_countries,
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

  useEffect(() => {
    document.title = `${name || title}`;
    return () => (document.title = "Flixster");
  }, [name, title]);

  const genre = genres?.map((genre) => genre.name);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="relative h-[35vh] w-full">
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="mx-auto grid w-[80%] grid-cols-2 ">
        <div className="w-1/2 translate-y-[-20%]  justify-self-center">
          <img src={`${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}}`} />
          {tagline !== "" && (
            <blockquote
              className={`pt-[24px] text-center text-[24px] ${
                theme === "dark" ? "text-[#fee715]" : "text-[#101820]"
              } leading-[1.5]`}
            >
              &quot;{tagline}&quot;
            </blockquote>
          )}
        </div>
        <div className="translate-x-[-10%]  p-4">
          <h2 className="mb-[16px] font-compressed text-[42px] font-bold">
            {title || name}
          </h2>
          <p className="mb-[32px] flex gap-4 text-2xl">
            {genre?.map((type) => (
              <span
                key={type}
                className={`border-2 p-4 ${
                  theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
                } rounded-full`}
              >
                {type}
              </span>
            ))}
          </p>
          {/*  */}
          <div className="mb-[16px] flex items-center gap-8  text-[18px] leading-[1.4]">
            <p
              className={`text-[24px] ${
                theme === "dark"
                  ? "bg-[#f4f4f4] text-[#1c1c1c]"
                  : "bg-[#1c1c1c] text-[#f4f4f4]"
              } w-max rounded-full p-4 font-bold`}
            >
              {vote_average?.toFixed(1)}
            </p>
            <button
              className={`${
                theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
              } w-max rounded-full border-2 p-5 font-bold ${
                theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
              }`}
            >
              <FaPlay className="text-[24px]"></FaPlay>
            </button>
            <span>Watch trailer</span>
          </div>
          <div className="grid grid-cols-[auto,auto,auto] justify-start gap-[16px] text-[16px]">
            <p>{type === "movie" ? "Release Date" : "First Airing"}</p>
            <p>:</p>
            <p>{type === "movie" ? release_date : first_air_date}</p>
            {/*  */}
            <p>Countries</p>
            <p>:</p>
            <p className="text-left">{production_countries?.at(0)?.name}</p>
          </div>
          {/*  */}
          <div className="pt-[36px]">
            <p className="py-4 text-[24px]">Overview</p>
            <br />
            <p className="text-[16px] leading-[1.5]">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
