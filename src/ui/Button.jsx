import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({ children, to, type, handlerFunc, ext_link }) {
  const primary =
    "focus: rounded-full w-max  bg-accent p-4  text-md  font-semibold text-[#101820] outline-none transition-all duration-300 ease-in-out hover:bg-yellow-200 focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-2 active:bg-yellow-300";

  const secondary =
    "focus: rounded-full  w-max border-2 border-white bg-transparent p-4  text-md  font-semibold text-white outline-none transition-all duration-300 ease-in-out  focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2";

  const link =
    "border-b-2 border-white w-max bg-transparent py-4  text-md  font-semibold text-white outline-none transition-all duration-300 ease-in-out hover:border-accent hover:text-accent focus:outline-none";

  const btn_styles = {
    primary,
    secondary,
    link,
  };

  if (type === "external_link") {
    return (
      <a href={ext_link} target="_blank" className={btn_styles.secondary}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={btn_styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handlerFunc} className={btn_styles[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  to: PropTypes.any,
  type: PropTypes.string.isRequired,
  handlerFunc: PropTypes.func,
  ext_link: PropTypes.any,
};
