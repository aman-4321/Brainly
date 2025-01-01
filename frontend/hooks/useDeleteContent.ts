import { API_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const removeContent = async (contentId: number) => {
  if (!contentId) throw new Error("Content ID is required");

  const response = await axios.delete(
    `${API_URL}/content/delete/${contentId}`,
    { withCredentials: true }
  );

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
    onError: (error) => {
      console.error("Delete error", error);
      alert("Failed to delete content");
    },
  });
  return { deleteContentMutation };
};

export default useDeleteContent;
