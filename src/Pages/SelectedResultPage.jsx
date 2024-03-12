import { useSelector, useDispatch } from "react-redux";
import { getMovieData } from "../Global/SelectedMovieSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
export default function SelectedResultPage() {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { theme } = useSelector((store) => store.theme);
  const { movieData } = useSelector((store) => store.selected_movie);
  const id = searchParam.get("id");
  const type = searchParam.get("type");
  console.log(type);

  const {
    title,
    media_type,
    backdrop_path,
    budget,
    genres,
    original_title = title,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
  } = movieData;

  useEffect(() => {
    dispatch(getMovieData(id, type));
  }, [dispatch, id, type]);

  console.log(media_type);
  return (
    <div>
      <div className="w-full h-[50vh] relative">
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_PATH}${backdrop_path}`}
          className="w-full h-full object-cover"
          alt=""
        />
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_PATH}${poster_path}}`}
          className="absolute bottom-[0] translate-y-[50%] right-[10%] w-[20%]"
        />
      </div>
    </div>
  );
}
