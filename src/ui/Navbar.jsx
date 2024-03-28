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
    (store) => store.navbar,
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
    <nav className="fixed z-50 w-full  bg-[#2c2c2c] bg-opacity-20  p-4 text-[#fee715] backdrop-blur-sm">
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <div>
          <h1 className="text-[48px] font-bold">Flixster</h1>
        </div>
        <ul className={`flex text-[#f4f4f4] ${style.navList}`}>
          <NavLink className="p-4 text-[18px]" to={"/home"}>
            Home
          </NavLink>

          <NavLink
            className="p-4 text-[18px]"
            to={"/movie?sort_by=popularity.desc&page=1"}
          >
            Movies
          </NavLink>

          <NavLink className="p-4 text-[18px]" to={"/tv"}>
            TV Show
          </NavLink>
          <NavLink className="p-4 text-[18px]" to={"/pricing"}>
            Pricing
          </NavLink>
        </ul>
        <div className="flex w-1/4 items-center justify-end gap-4">
          <form className="relative w-[70%]" onSubmit={handleSubmit}>
            <input
              placeholder="Search movies"
              onChange={(e) => dispatch(searchQuery(e.target.value))}
              value={searchValue}
              className="h-max w-full rounded-full border border-white bg-transparent p-3 text-center text-[16px] text-[#f4f4f4] placeholder:text-center placeholder:text-[#f4f4f4] focus:outline-none"
            />
            <FaMagnifyingGlass className="absolute left-[10px] top-1/2 translate-y-[-50%] text-[16px] text-[#f4f4f4]" />
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
