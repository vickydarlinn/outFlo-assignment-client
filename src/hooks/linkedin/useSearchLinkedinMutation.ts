import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchLinkedinPeople } from "@/services/api";

interface Payload {
  url: string;
  count?: number;
}

export const useSearchLinkedinMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["linkedin", "search"],
    mutationFn: (payload: Payload) => searchLinkedinPeople(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["linkedin", "latest"] });
    },
  });
};
