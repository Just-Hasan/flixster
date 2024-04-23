import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";
import { getTheme } from "../../Global/ThemeSlice";
import { useSelector } from "react-redux";
export default function MovieItemSkeleton({ count, type = "multiple" }) {
  const theme = useSelector(getTheme);
  if (type === "single") {
    return (
      <li className="aspect-[2/3]">
        <Skeleton
          baseColor={theme === "dark" ? "#f4f4f4" : "#1c1c1c"}
          highlightColor={theme === "dark" ? "#adb5bd" : "#444"}
          width={"100%"}
          height={"100%"}
          duration={3.5}
        />
      </li>
    );
  }

  return Array(count)
    .fill(0)
    .map((_, i) => {
      return (
        <li className="aspect-[2/3]" key={i}>
          <Skeleton
            baseColor={theme === "dark" ? "#f4f4f4" : "#1c1c1c"}
            highlightColor={theme === "dark" ? "#adb5bd" : "#444"}
            width={"100%"}
            height={"100%"}
            duration={3.5}
          />
        </li>
      );
    });
}

MovieItemSkeleton.propTypes = {
  count: PropTypes.number,
  type: PropTypes.string,
};
