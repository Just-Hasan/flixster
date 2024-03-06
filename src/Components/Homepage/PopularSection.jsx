import { useSelector } from "react-redux";
import PopularItem from "./PopularItem";
import styles from "../../Styles/PopularSection.module.css";

export default function PopularSection() {
  const { popular } = useSelector((store) => store.homepage);

  console.log(popular);

  return (
    <section className={`${styles.bg} `}>
      <div className="w-[90%] mx-auto py-[48px] z-10">
        <h2 className="text-subTitle mb-[24px] font-bold text-white">
          Popular movie
        </h2>
        <ul className="grid grid-cols-4 gap-y-16 gap-x-8">
          {popular.slice(5, 12).map((movie) => {
            return <PopularItem movie={movie} key={movie.id}></PopularItem>;
          })}
        </ul>
      </div>
    </section>
  );
}
