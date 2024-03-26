import {
  airingMovies,
  popularMovies,
  topRatedMovies,
  airingTv,
} from "../Global/HomepageSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

/////////////////////////////////////[Swiper css]
import "swiper/css";

/////////////////////////////////////[Component]
import HomepageMovieItem from "../Components/Homepage/HomepageMovieItem";
import PopularSection from "../Components/Homepage/PopularSection";
import TopRatedSection from "../Components/Homepage/TopRatedSection";
import { Link } from "react-router-dom";
import UpcomingSection from "../Components/Homepage/UpcomingSection";
import MovieItem from "../ui/MovieItem";
import Button from "../ui/Button";
export default function Homepage() {
  const [movieSection, setMovieAction] = useState(0);
  const homepageData = useSelector((store) => store.homepage);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(airingMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(popularMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(topRatedMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(airingTv());
  }, [dispatch]);

  const { airing, airingTvSeries } = homepageData;

  const movieType = [
    { type: "Popular", section: <PopularSection key={0} /> },
    { type: "Top Rated", section: <TopRatedSection key={1} /> },
    { type: "Upcoming", section: <UpcomingSection key={2} /> },
  ];
  return (
    <>
      <section>
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: false,
          }}
          navigation={true}
          modules={[Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            easing: "easeInQuad",
          }}
        >
          {airing.slice(0, 5).map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <HomepageMovieItem movie={movie}></HomepageMovieItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section
        className={`${
          theme === "light" ? "bg-white" : "bg-[#1c1c1c]"
        } py-16 duration-300 ease-in-out`}
      >
        <div className="mx-auto w-[90%]">
          <nav className="mb-9 mt-12 grid grid-cols-3 items-center justify-between text-subTitle">
            <h2
              className={`${
                theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
              } w-full font-bold duration-300 ease-in-out`}
            >
              {movieType[movieSection].type} Movie
            </h2>
            <div className="flex items-center gap-8 justify-self-center overflow-hidden rounded-full bg-[#f4f4f4] text-[18px] text-[#1c1c1c] ring ring-gray-200">
              {movieType.map((movie, i) => {
                return (
                  <button
                    key={i}
                    className={`p-4 ${
                      movieSection === i && "bg-[#fee715]"
                    } text-center`}
                    onClick={() => setMovieAction(i)}
                  >
                    {movie.type}
                  </button>
                );
              })}
            </div>
            <Link
              to={`${movieType[movieSection].type}`}
              className={`text-[18px] underline ${
                theme === "dark" ? "text-white" : "text-black"
              } justify-self-end`}
            >
              See all
            </Link>
          </nav>
          {movieType[movieSection].section}
        </div>
      </section>
      {/*  */}
      <hr></hr>
      <section
        className={`${
          theme === "light" ? "bg-white" : "bg-[#1c1c1c]"
        } py-16 duration-300 ease-in-out`}
      >
        {" "}
        <div className="mx-auto w-[90%]">
          <div className="mb-[36px] mt-[48px] grid grid-cols-2 items-center justify-between text-subTitle">
            <h2
              className={`${
                theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
              } w-full font-bold duration-300 ease-in-out`}
            >
              Airing series
            </h2>
            <Link
              to={`${movieType[movieSection].type}`}
              className={`text-[18px] underline ${
                theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
              } justify-self-end `}
            >
              See all
            </Link>
          </div>
          <ul className="grid grid-cols-4 gap-8">
            {airingTvSeries.slice(0, 8).map((tv) => {
              return <MovieItem key={tv.id} movie={tv} type="tv" />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
