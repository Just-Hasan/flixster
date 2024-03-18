import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube";
export default function Video({ vid, theme }) {
  return (
    <div className="aspect-video rounded-3xl">
      <ReactPlayer
        url={`${import.meta.env.VITE_YT_BASE}${vid.key}`}
        controls={true}
        width="100%"
        height="100%"
        fallback={<p>Loading...</p>}
        config={{
          youtube: {
            playerVars: { showinfo: 1, fs: 1 },
          },
        }}
      />
      <p
        className={`${theme === "dark" ? "text-white" : " text-black"} pt-4 text-[16px] leading-[1.5]`}
      >
        {vid?.name}
      </p>
    </div>
  );
}

Video.propTypes = {
  vid: PropTypes.object,
  theme: PropTypes.string,
};
