import { API_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteContent = () => {
  const queryClient = useQueryClient();

  const deleteContent = useMutation({
    mutationKey: ["deleteContent"],
    mutationFn: async (contentId: number) => {
      if (!contentId) throw new Error("Content ID is required");

      const response = await axios.delete(
        `${API_URL}/content/delete/${contentId}`,
        { withCredentials: true }
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      console.error("Delete error", error);
      alert("Failed to delete content");
    },
  });
  return { deleteContent };
};

export default useDeleteContent;
