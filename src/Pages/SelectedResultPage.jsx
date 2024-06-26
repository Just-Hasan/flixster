import { useSelector } from "react-redux";
import { useRef, useState } from "react";

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
import RecommendationsSection from "../Components/SelectedResultPage/RecommendationsSection";
import AddToFavouriteSection from "../Components/SelectedResultPage/AddToFavouriteSection";
import { useGetShowData } from "../Components/SelectedResultPage/useGetShowData";
import Loader2 from "../ui/Loader2";
import {
  fetchCredits,
  fetchData,
  fetchRecommendations,
  fetchVideo,
  fetchWatchProvider,
} from "../api/selected_movie_tv";

export default function SelectedResultPage() {
  const [searchParam] = useSearchParams();
  const [reviews] = useState("");
  const { theme } = useSelector((store) => store.theme);

  const vidsSection = useRef(null);
  const watchSection = useRef(null);
  const id = searchParam.get("id");
  const type = searchParam.get("type");

  const { data: movieData = {}, isLoading: isFetchingMovieData } =
    useGetShowData(fetchData, "fetchData");

  const { data: movieVids = {}, isLoading: isFetchingMovieVids } =
    useGetShowData(fetchVideo, "fetchVideo");

  const { data: movieCredits = {}, isLoading: isFetchingMovieCredits } =
    useGetShowData(fetchCredits, "fetchCredits");

  const { data: movieProvider = {}, isLoading: isFetchingMovieProvider } =
    useGetShowData(fetchWatchProvider, "fetchProvider");

  const {
    data: movieRecommendations = {},
    isLoading: isFetchingMovieRecommendations,
  } = useGetShowData(fetchRecommendations, "fetchSimilar");

  const {
    title,
    budget,
    genres,
    name,
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
    document.title = `${name || title}`;
    return () => (document.title = "Flixster");
  }, [name, title]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

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

  const movieTvHasRecommendations = movieRecommendations.length > 0;
  // console.log(`${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}`);
  const favShowData = {
    id: Number(id),
    title: title || name,
    type,
    genres,
    posterImg: `${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}`,
    reviews,
  };

  if (
    isFetchingMovieCredits ||
    isFetchingMovieData ||
    isFetchingMovieProvider ||
    isFetchingMovieRecommendations ||
    isFetchingMovieVids
  )
    return <Loader2></Loader2>;

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } relative transition-all duration-300 ease-in-out`}
    >
      <BackdropPoster backdrop_path={movieData?.backdrop_path} />

      <section className="mx-auto grid w-[80%] grid-cols-2 ">
        <PosterAndTagline
          poster_path={poster_path}
          tagline={tagline}
          theme={theme}
        />

        <div className="flex translate-x-[-10%] flex-col gap-y-12 p-4">
          <h2 className="font-compressed text-[42px] font-bold">
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

      <AddToFavouriteSection favShowData={favShowData} />

      <CastSection movieCredits={movieCredits} />

      {movieVids?.results?.length !== 0 && (
        <div ref={vidsSection}>
          <VideosSection theme={theme} video={movieVids} />
        </div>
      )}
      <hr className="mx-auto mt-16 w-[90%]" />
      <div ref={watchSection}>
        <WatchSection
          theme={theme}
          movieProvider={movieStreamData}
          movieStreamLink={movieStreamLink}
        />
      </div>

      {tvHasSeasons && (
        <>
          <hr className="mx-auto w-[90%]"></hr>
          <TvSeasons seasons={seasons} />
        </>
      )}

      {movieTvHasRecommendations && (
        <>
          <hr className="mx-auto mt-16 w-[90%]" />
          <RecommendationsSection movie={movieRecommendations} type={type} />
        </>
      )}
    </div>
  );
}
