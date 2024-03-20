import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";

export default function RatingAndTrailerBtn({ theme, vote_average }) {
  return (
    <div className="mb-[16px] flex items-center gap-4  text-[18px] leading-[1.4]">
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
        Detail
      </button>
      <button
        className={`${
          theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
        } w-max rounded-full border-2 p-5 font-bold ${
          theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
        }`}
      >
        Trailer
      </button>
      <button
        className={`${
          theme === "dark" ? "text-[#f4f4f4]" : "text-[#1c1c1c]"
        } w-max rounded-full border-2 p-5 font-bold ${
          theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
        }`}
      >
        <FaPlay className="text-[24px]"></FaPlay>
      </button>
      <span>Watch Movie</span>
    </div>
  );
}

RatingAndTrailerBtn.propTypes = {
  theme: PropTypes.string,
  vote_average: PropTypes.any,
};
