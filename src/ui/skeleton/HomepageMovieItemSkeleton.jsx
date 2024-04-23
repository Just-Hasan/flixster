import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomepageMovieItemSkeleton() {
  return (
    <div className="max-h-[100vh] max-w-[100vw] place-content-center">
      <div className="h-full w-full">
        <Skeleton
          baseColor="#1c1c1c"
          highlightColor="#444"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            zIndex: "10",
          }}
        />
      </div>
      <div className="absolute bottom-[15%] left-[5%]">
        <Skeleton
          baseColor="#444"
          highlightColor="#1c1c1c"
          style={{
            zIndex: "11",
            top: "0",
            left: "0",
            width: "250px",
            height: "48px",
          }}
        />
        <div>
          <Skeleton
            baseColor="#444"
            highlightColor="#1c1c1c"
            style={{
              zIndex: "11",
              top: "0",
              left: "0",
              width: "50vw",
              height: "24px",
              marginTop: "2rem",
            }}
            count={3}
          />
        </div>
        <div className="grid grid-cols-5 items-start justify-start gap-x-4">
          {Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  baseColor="#444"
                  highlightColor="#1c1c1c"
                  style={{
                    zIndex: "11",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "24px",
                    marginTop: "2rem",
                    borderRadius: "30px",
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
