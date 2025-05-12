import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/services/api";

export const useFetchSingleCampaignQuery = (campaignId: string) => {
  return useQuery({
    queryKey: ["campaigns", campaignId],

    queryFn: () => getCampaignById(campaignId),
  });
};
