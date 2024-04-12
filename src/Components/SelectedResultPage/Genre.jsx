import PropTypes from "prop-types";

export default function Genre({ genre, theme }) {
  return (
    <p className="flex gap-4 text-2xl">
      {genre?.map((type) => (
        <span
          key={type}
          className={`border-2 p-4 ${
            theme === "dark" ? "border-[#f4f4f4]" : "border-[#1c1c1c]"
          } rounded-full`}
        >
          {type}
        </span>
      ))}
    </p>
  );
}

Genre.propTypes = {
  genre: PropTypes.array,
  theme: PropTypes.string,
};
