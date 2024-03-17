import { useSelector, useDispatch } from "react-redux";

import {
  getMovieData,
  getMovieVideo,
  getMovieCredits,
} from "../Global/SelectedMovieSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Overview from "../Components/SelectedResultPage/Overview";
import MovieDetails from "../Components/SelectedResultPage/MovieDetails";
import Genre from "../Components/SelectedResultPage/Genre";
import PosterAndTagline from "../Components/SelectedResultPage/PosterAndTagline";
import RatingAndTrailerBtn from "../Components/SelectedResultPage/RatingAndTrailerBtn";
import BackdropPoster from "../Components/SelectedResultPage/BackdropPoster";
import CastSection from "../Components/SelectedResultPage/CastSection";
import VideosSection from "../Components/SelectedResultPage/VideosSection";
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
    created_by,
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

  console.log(movieVids);
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } transition-all duration-300 ease-in-out`}
    >
      <BackdropPoster backdrop_path={backdrop_path} />

      <section className="mx-auto grid w-[80%] grid-cols-2 ">
        <PosterAndTagline
          poster_path={poster_path}
          tagline={tagline}
          theme={theme}
        />

        <div className="translate-x-[-10%]  p-4">
          <h2 className="mb-[16px] font-compressed text-[42px] font-bold">
            {title || name}
          </h2>

          <Genre genre={genre} theme={theme} />

          <RatingAndTrailerBtn theme={theme} vote_average={vote_average} />

          <MovieDetails
            first_air_date={first_air_date}
            production_countries={production_countries}
            release_date={release_date}
            created_by={created_by}
            type={type}
            status={status}
            budget={budget}
            revenue={revenue}
          />

          <Overview overview={overview} />
        </div>
      </section>
      <CastSection movieCredits={movieCredits} />
      <VideosSection />
    </div>
  );
}
