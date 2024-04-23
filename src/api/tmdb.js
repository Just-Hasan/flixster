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

export const fetchDiscoverMovies = async function (sort_by, page_num) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}discover/movie`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        page: page_num || 1,
        sort_by: sort_by,
      },
    },
  );
  return data;
};

export const fetchAiringMovies = async function () {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  return data;
};

export const fetchPopularMovies = async function () {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  return data;
};

export const fetchTopRatedMovies = async function () {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  return data;
};

export const fetchUpcomingMovies = async function () {
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

export const fetchPopularTv = async function () {
  const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
  });
  return data;
};

export const fetchDiscoverTv = async function (page, sort) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}discover/tv`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        page: Number(page) || 1,
        sort_by: sort,
      },
    },
  );
  return data;
};
