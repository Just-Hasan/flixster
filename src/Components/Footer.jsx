import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useSelector((store) => store.theme);

  return (
    <footer
      className={`bottom-0 ${
        theme === "dark"
          ? "bg-[#1c1c1c] text-[#f4f4f4]"
          : "bg-[#f4f4f4] text-[#1c1c1c]"
      } flex justify-between border-white p-8  text-[16px]`}
    >
      <p>
        &copy; {new Date().getFullYear()} <b>Flixster</b>
      </p>
      <ul className="flex gap-4">
        <li>
          <Link to={"#"}>About</Link>
        </li>
        <li>
          <Link to={"#"}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={"#"}>Licensing</Link>
        </li>
        <li>
          <Link to={"#"}>Contact</Link>
        </li>
      </ul>
    </footer>
  );
}
