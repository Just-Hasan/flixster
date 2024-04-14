import axios from "axios";

export const fetchSearchData = async function (props) {
  const queryKey = props.queryKey?.at(2)?.query;
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/multi",
      {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query: queryKey,
          page: props.pageParam,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUpcoming = async function () {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming",
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        page: 1,
      },
    },
  );
  return data;
};
