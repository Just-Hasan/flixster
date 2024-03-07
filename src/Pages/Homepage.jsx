import {
  airingMovies,
  popularMovies,
  topRatedMovies,
} from "../Global/HomepageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

/////////////////////////////////////[Swiper css]
import "swiper/css";
import styles from "../Styles/Homepage.module.css";

/////////////////////////////////////[Component]
import MovieItem from "../Components/Homepage/HomepageMovieItem";
import PopularSection from "../Components/Homepage/PopularSection";
import TopRatedSection from "../Components/Homepage/TopRatedSection";
import { Link } from "react-router-dom";
import UpcomingSection from "../Components/Homepage/UpcomingSection";

export default function Homepage() {
  const [movieSection, setMovieAction] = useState(0);
  const homepageData = useSelector((store) => store.homepage);
  const dispatch = useDispatch();
  console.log(movieSection);
  useEffect(() => {
    dispatch(airingMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(popularMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(topRatedMovies());
  }, [dispatch]);
  const { airing } = homepageData;
  const movieType = [
    { type: "Popular", section: <PopularSection key={0} /> },
    { type: "Top Rated", section: <TopRatedSection key={1} /> },
    { type: "Upcoming", section: <UpcomingSection key={2} /> },
  ];
  console.log(movieType[movieSection].type);

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
                <MovieItem movie={movie}></MovieItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className="bg-[#1c1c1c] py-16">
        <div className="w-[90%] mx-auto">
          <nav className="text-subTitle mb-[36px] mt-[48px] grid grid-cols-3 justify-between items-center">
            <h2 className=" text-[#f4f4f4] font-bold w-full">
              {movieType[movieSection].type} Movie
            </h2>
            <div className="flex text-[18px] items-center gap-8 text-[#1c1c1c] bg-[#f4f4f4]  rounded-full overflow-hidden justify-self-center">
              {/* <button
                onClick={() => setMovieAction(0)}
                className="p-4 bg-[#fee715]"
              >
                Popular
              </button>

              <button onClick={() => setMovieAction(1)} className="p-4">
                Top Rated
              </button>

              <button onClick={() => setMovieAction(2)} className="p-4">
                Upcoming
              </button> */}
              {movieType.map((movie, i) => {
                return (
                  <button
                    key={i}
                    className={`p-4 ${movieSection === i && "bg-[#fee715]"}`}
                    onClick={() => setMovieAction(i)}
                  >
                    {movie.type}
                  </button>
                );
              })}
            </div>
            <Link
              to={`${movieType[movieSection].type}`}
              className="text-[18px] underline text-[#f4f4f4] justify-self-end"
            >
              See all
            </Link>
          </nav>
          {movieType[movieSection].section}
        </div>
      </section>
    </>
  );
}
