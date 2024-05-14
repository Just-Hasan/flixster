import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useGetShowData(fetchFunc, queryType) {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const type = searchParams.get("type");
  const movieId = Number(searchParams.get("id"));
  const { data, error, isLoading } = useQuery({
    queryKey: [title, type, movieId, queryType],
    queryFn: () => fetchFunc(type, movieId),
  });

  if (error) {
    throw new Error("Cannot find data");
  }

  return { data, isLoading };
}
