import axios from "axios";

export async function fetchData(type, movieID) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}`,
    {
      params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
    },
  );

  if (!data) throw new Error("Data not found");

  return data;
}

export async function fetchVideo(type, movieID) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}/videos`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  if (!data) throw new Error("Data not found");
  return data;
}

export async function fetchCredits(type, movieID) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}/credits`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  if (!data) throw new Error("Data not found");
  return data;
}

export async function fetchWatchProvider(type, movieId) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}/watch/providers`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  if (!data) throw new Error("Data not found");
  return data.results;
}

export async function fetchRecommendations(type, movieID) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_TMDB_BASE_URL}${type}/${movieID}/recommendations`,
    {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    },
  );
  if (!data) throw new Error("Data not found");
  return data.results;
}
