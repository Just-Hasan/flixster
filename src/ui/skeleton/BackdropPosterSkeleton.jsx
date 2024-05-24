import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { getTheme } from "../../Global/ThemeSlice";
export default function BackdropPosterSkeleton() {
  const theme = useSelector(getTheme);
  return (
    <div className="absolute h-full w-full">
      <Skeleton
        baseColor={theme === "dark" ? "#f4f4f4" : "#444"}
        highlightColor={theme === "dark" ? "#adb5bd" : "#444"}
        width={"100%"}
        height={"100%"}
        duration={4}
      />
    </div>
  );
}
