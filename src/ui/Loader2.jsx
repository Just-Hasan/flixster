import { getTheme } from "../Global/ThemeSlice";
import { useSelector } from "react-redux";
import style from "../Styles/Loader2.module.css";

export default function Loader2() {
  const theme = useSelector(getTheme);
  return (
    <div
      className={`z-[100] grid h-dvh w-[100%] place-content-center bg-black text-white`}
    >
      <div className={style.lds_facebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
