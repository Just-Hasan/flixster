import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import style from "../Styles/Navbar.module.css";
export default function Navbar() {
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

          <NavLink className="text-[18px] p-4" to={"/movies"}>
            Movies
          </NavLink>

          <NavLink className="text-[18px] p-4" to={"/tv-show"}>
            TV Show
          </NavLink>
          <NavLink className="text-[18px] p-4" to={"/pricing"}>
            Pricing
          </NavLink>
        </ul>
        <div className="flex justify-end w-1/4">
          <div className="w-[70%] relative">
            <input
              placeholder="Search movies"
              className="p-2 h-max rounded-full w-full text-[16px] text-center text-[#1c1c1c] placeholder:text-center"
            />
            <FaMagnifyingGlass className="text-[16px] absolute  left-[10px] top-3 text-[#1c1c1c]" />
          </div>
        </div>
      </div>
    </nav>
  );
}
