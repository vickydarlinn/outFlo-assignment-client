import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampaign } from "@/services/api";
import type { CreateCampaignDTO } from "@/types";

export const useCreateCampaignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["campaigns", "create"],
    mutationFn: (data: CreateCampaignDTO) => createCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
