import { getCampaigns } from "@/services/api";
import type { Campaign } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchCampaignsQuery = () => {
  return useQuery<Campaign[], Error>({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });
};
