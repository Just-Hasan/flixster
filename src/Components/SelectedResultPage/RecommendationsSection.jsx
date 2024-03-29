import { useSelector } from "react-redux";
import MovieItem from "../../ui/MovieItem";
import PropTypes from "prop-types";

/////////////////////////////////////[Swiper Essentials]
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../../Styles/RecommendationsSection.module.css";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function RecommendationsSection({ movie, type }) {
  return (
    <section
      className={style.section}
      // className={`transition-all duration-300  ${theme === "dark" ? "bg-[#1c1c1c] text-white" : "bg-[#f4f4f4] text-black"} p-[24px] ease-in-out`}
    >
      <div className="mx-auto w-[90%]">
        {" "}
        <h2 className="mb-[24px] text-[32px]">Reccomend for you</h2>
        <Swiper
          className={`${style.swiper}`}
          modules={[Pagination]}
          slidesPerView={5}
          spaceBetween={30}
        >
          {movie?.map((mv) => (
            <SwiperSlide key={mv.id} className={style.swiperSlide}>
              <MovieItem type={type} movie={mv} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

RecommendationsSection.propTypes = {
  movie: PropTypes.array,
  type: PropTypes.string,
};
