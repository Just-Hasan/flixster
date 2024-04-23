import { useQuery } from "@tanstack/react-query";

export function useFetchShow(fetchShowFunc, showType) {
  const { data, isPending } = useQuery({
    queryKey: [showType],
    queryFn: fetchShowFunc,
  });
  const results = data?.results;
  return { isPending, results };
}
