import PropTypes from "prop-types";

export default function Overview({ overview }) {
  return (
    <div className="pb-9 pt-[36px]">
      <p className="py-4 text-[24px]">Overview</p>
      <br />
      <p className="text-[16px] leading-[1.5]">{overview}</p>
    </div>
  );
}

Overview.propTypes = {
  overview: PropTypes.any,
};
