import { airingMovies } from "../Global/HomepageSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

/////////////////////////////////////[Swiper css]
import "swiper/css";
import styles from "../Styles/Homepage.module.css";

/////////////////////////////////////[Component]
import MovieItem from "../Components/Homepage/MovieItem";

export default function Homepage() {
  const homepageData = useSelector((store) => store.homepage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(airingMovies());
  }, [dispatch]);
  const { airing } = homepageData;
  console.log(airing);
  return (
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
              <MovieItem movie={movie}></MovieItem>;
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
