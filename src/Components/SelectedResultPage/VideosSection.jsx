import PropTypes from "prop-types";
import { useState } from "react";
import Video from "./Video";

export default function VideosSection({ theme, video }) {
  const type = video?.results?.map((v) => v.type);
  const uniqueType = [...new Set(type)];
  const [videoType, setVideoType] = useState("Trailer");
  const testVid = video?.results;
  const testVidFilter = testVid?.filter((vid) => vid.type === videoType);

  return (
    <section
      className={`transition-all duration-300  ${theme === "dark" ? "bg-[#1c1c1c] text-white" : "bg-[#f4f4f4] text-black"} p-[24px] ease-in-out`}
    >
      <div className="mx-auto w-[90%]">
        <h2 className="mb-[24px] text-[32px]">Videos</h2>

        <ul className="flex w-max  overflow-hidden rounded-full border-2 p-2">
          {uniqueType.map((type) => (
            <li
              key={type}
              className={`p-4 text-2xl transition-all duration-200 ease-in-out ${videoType === type && "rounded-full bg-red-500 text-white"}`}
            >
              <button onClick={() => setVideoType(type)}>{type}</button>
            </li>
          ))}
        </ul>

        <div className="mt-[42px] grid grid-cols-3 gap-8">
          {testVidFilter?.map((vid) => {
            return <Video key={vid.id} vid={vid} theme={theme} />;
          })}
        </div>
      </div>
    </section>
  );
}

VideosSection.propTypes = {
  theme: PropTypes.string,
  video: PropTypes.any,
};
