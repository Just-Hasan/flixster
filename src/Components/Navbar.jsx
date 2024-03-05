import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-[#2c2c2c] p-4 text-[#fee715] flex justify-between items-center fixed w-full  bg-opacity-20 backdrop-blur-sm z-50">
      <div>
        <h1 className="text-[32px] font-bold">Flixster</h1>
      </div>
      <ul className="flex gap-4 text-[#f4f4f4]">
        <NavLink className="text-xl" to={"/home"}>
          Home
        </NavLink>

        <NavLink className="text-xl" to={"/movies"}>
          Movies
        </NavLink>

        <NavLink className="text-xl" to={"/tv-show"}>
          TV Show
        </NavLink>
        <NavLink className="text-xl" to={"/pricing"}>
          Pricing
        </NavLink>
      </ul>
      <div className="flex justify-end w-1/4">
        <div className="w-[70%] relative">
          <input
            placeholder="Search movies"
            className="p-2 h-max rounded-full w-full text-xl text-center text-[#1c1c1c] placeholder:text-center"
          />
          <FaMagnifyingGlass className="text-[16px] absolute top-1/4 left-[5px] text-[#1c1c1c]" />
        </div>
      </div>
    </nav>
  );
}
