import { airingMovies } from "../Global/HomepageSlice";
import { useSelector, useDispatch } from "react-redux";
/////////////////////////////////////[Component]
import { useEffect } from "react";

export default function Homepage() {
  const homepageData = useSelector((store) => store.homepage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(airingMovies());
  }, [dispatch]);
  const { airing } = homepageData;
  console.log(airing);
  return (
    <section>
      <ul>
        {airing.map((movie) => {
          return (
            <li key={movie.id}>
              <img
                src={`${import.meta.env.VITE_TMBD_IMG_PATH}${
                  movie.poster_path
                }`}
              ></img>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
