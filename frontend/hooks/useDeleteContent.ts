import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeContent = async (contentId: number) => {
  if (!contentId) throw new Error("Content ID is required");

  const response = await axiosInstance.delete(`/content/delete/${contentId}`);

  return response.data;
};

const useDeleteContent = () => {
  const queryClient = useQueryClient();

  const deleteContentMutation = useMutation({
    mutationKey: ["deleteContent"],
    mutationFn: removeContent,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: () => {
      alert("Failed to delete content");
    },
  });
  return { deleteContentMutation };
};

export default useDeleteContent;
