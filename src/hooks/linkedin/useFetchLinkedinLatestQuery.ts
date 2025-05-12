import { useQuery } from "@tanstack/react-query";
import { getLinkedinLatestResults } from "@/services/api";
import type { LinkedinResult } from "@/types";

export const useFetchLinkedinLatestQuery = (limit = 10) =>
  useQuery<LinkedinResult[], Error>({
    queryKey: ["linkedin", "latest", limit],
    queryFn: () => getLinkedinLatestResults(limit),
  });
