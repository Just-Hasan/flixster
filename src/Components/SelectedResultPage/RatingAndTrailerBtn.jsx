import { FaPlay } from "react-icons/fa";
import PropTypes from "prop-types";
import Button from "../../ui/Button";

export default function RatingAndTrailerBtn({
  theme,
  vote_average,
  goToVidsSection,
  goToWatchSection,
  officialWeb,
}) {
  return (
    <div className="flex items-center gap-4 text-[18px] leading-[1.4]">
      <p
        className={`text-[24px] ${
          theme === "dark"
            ? "bg-[#f4f4f4] text-[#1c1c1c]"
            : "bg-[#1c1c1c] text-[#f4f4f4]"
        } w-max rounded-full p-4 font-bold`}
      >
        {vote_average?.toFixed(1)}
      </p>
      <Button type="external_link" ext_link={officialWeb}>
        Detail
      </Button>
      <Button handlerFunc={goToVidsSection} type="secondary">
        Trailer
      </Button>
      <Button type="secondary" handlerFunc={goToWatchSection}>
        <FaPlay className="text-[24px]"></FaPlay>
      </Button>
      <span>Watch Movie</span>
    </div>
  );
}

RatingAndTrailerBtn.propTypes = {
  theme: PropTypes.string,
  vote_average: PropTypes.any,
  goToVidsSection: PropTypes.func,
  goToWatchSection: PropTypes.func,
  officialWeb: PropTypes.any,
};
