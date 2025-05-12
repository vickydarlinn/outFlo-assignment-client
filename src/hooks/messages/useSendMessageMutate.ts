import { useMutation } from "@tanstack/react-query";
import { generatePersonalizedMessage } from "@/services/api";
import type { LinkedInProfile } from "@/types";

export const useSendMessageMutate = () => {
  return useMutation({
    mutationKey: ["messages", "create"],
    mutationFn: (data: LinkedInProfile) => generatePersonalizedMessage(data),
  });
};
