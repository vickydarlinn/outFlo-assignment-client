import { deleteCampaign } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCampaignMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
