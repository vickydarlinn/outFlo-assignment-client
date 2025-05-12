import { updateCampaign } from "@/services/api";
import type { UpdateCampaignDTO } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCampaignMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["campaigns", "update"],
    mutationFn: ({ id, data }: { id: string; data: UpdateCampaignDTO }) =>
      updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
