import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getMovieData,
  getMovieVideo,
  getMovieCredits,
  getMovieProvider,
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
import WatchSection from "../Components/SelectedResultPage/WatchSection";
import TvSeasons from "../Components/SelectedResultPage/TvSeasons";
import Button from "../ui/Button";

export default function SelectedResultPage() {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { theme } = useSelector((store) => store.theme);
  const { movieData, movieVids, movieCredits, movieProvider } = useSelector(
    (store) => store.selected_movie,
  );
  const vidsSection = useRef(null);
  const watchSection = useRef(null);

  const id = searchParam.get("id");
  const type = searchParam.get("type");

  const {
    title,
    budget,
    genres,
    name,
    original_title = title,
    overview,
    poster_path,
    release_date,
    revenue,
    status,
    vote_average,
    tagline,
    first_air_date,
    production_countries,
    created_by,
    seasons,
    homepage,
  } = movieData;

  /////////////////////////////////////[Handler Function]
  function goToVidsSection() {
    vidsSection?.current?.scrollIntoView({ behavior: "smooth" });
  }

  function goToWatchSection() {
    watchSection?.current?.scrollIntoView({ behavior: "smooth" });
  }

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

  useEffect(() => {
    dispatch(getMovieProvider(id, type));
  }, [dispatch, id, type]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const genre = genres?.map((genre) => genre.name);

  const objectValue = Object.values(movieProvider);

  const alternativeMovieData = objectValue.find(
    (link) => link.flatrate?.length >= 1,
  );

  const movieStreamLink = objectValue?.at(0)?.link;

  const movieStreamData =
    movieProvider?.US?.flatrate?.length >= 1
      ? movieProvider?.US
      : alternativeMovieData;

  const tvHasSeasons = type === "tv" && seasons?.length > 0;

  console.log(movieData);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } transition-all duration-300 ease-in-out`}
    >
      <BackdropPoster backdrop_path={movieData?.backdrop_path} />

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

          <RatingAndTrailerBtn
            theme={theme}
            vote_average={vote_average}
            goToVidsSection={goToVidsSection}
            goToWatchSection={goToWatchSection}
            officialWeb={homepage}
          />

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

      {movieVids?.results?.length !== 0 && (
        <div ref={vidsSection}>
          <VideosSection theme={theme} video={movieVids} />
        </div>
      )}

      <hr className="mx-auto w-[90%]" />
      <div ref={watchSection}>
        <WatchSection
          theme={theme}
          movieProvider={movieStreamData}
          movieStreamLink={movieStreamLink}
        />
      </div>

      {tvHasSeasons && <hr className="mx-auto w-[90%]" />}

      {tvHasSeasons && <TvSeasons seasons={seasons} />}
    </div>
  );
}
