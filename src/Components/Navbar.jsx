import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import style from "../Styles/Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchQuery } from "../Global/NavbarSlice";
import { setTheme } from "../Global/ThemeSlice";
import { searchMovieOrTv } from "../Global/NavbarSlice";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "light", label: <IoSunny className="text-2xl text-black" /> },
  { value: "dark", label: <FaMoon className="text-2xl text-black" /> },
];

export default function Navbar() {
  const { searchValue, searched, page, totalPage } = useSelector(
    (store) => store.navbar
  );
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue === "") {
      navigate("/home");
      dispatch(searchQuery(""));
      return;
    }
    dispatch(searchMovieOrTv(searchValue));
    navigate(`show/searched?query=${searchValue}&page=${page}`);
    dispatch(searchQuery(""));
  }

  const handleToggleTheme = function (selectedOption) {
    dispatch(setTheme(selectedOption.value));
  };

  return (
    <nav className="bg-[#2c2c2c] p-4 text-[#fee715]  fixed w-full  bg-opacity-20 backdrop-blur-sm z-50">
      <div className="flex items-center justify-between mx-auto w-[90%]">
        <div>
          <h1 className="text-[48px] font-bold">Flixster</h1>
        </div>
        <ul className={`flex text-[#f4f4f4] ${style.navList}`}>
          <NavLink className="text-[18px] p-4" to={"/home"}>
            Home
          </NavLink>

          <NavLink className="text-[18px] p-4" to={"/movie"}>
            Movies
          </NavLink>

          <NavLink className="text-[18px] p-4" to={"/tv"}>
            TV Show
          </NavLink>
          <NavLink className="text-[18px] p-4" to={"/pricing"}>
            Pricing
          </NavLink>
        </ul>
        <div className="flex items-center justify-end w-1/4 gap-4">
          <form className="w-[70%] relative" onSubmit={handleSubmit}>
            <input
              placeholder="Search movies"
              onChange={(e) => dispatch(searchQuery(e.target.value))}
              value={searchValue}
              className="p-3 h-max rounded-full w-full text-[16px] text-center text-[#f4f4f4] focus:outline-none placeholder:text-center bg-transparent border border-white"
            />
            <FaMagnifyingGlass className="text-[16px] absolute left-[10px] top-1/2 translate-y-[-50%] text-[#f4f4f4]" />
          </form>
          <Select
            options={options}
            placeholder="Theme"
            value={options.find((option) => option.value === theme)}
            className={style.select}
            onChange={handleToggleTheme}
            styles={{
              placeholder: (provided) => ({
                ...provided,
                fontSize: "14px",
                backgroundColor: "transparent",
              }),
            }}
          />
        </div>
      </div>
    </nav>
  );
}
