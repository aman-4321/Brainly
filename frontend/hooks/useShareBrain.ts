import { API_URL } from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ShareBrain = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/share/openall`,
      { share: true },
      { withCredentials: true }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data || "Something went wrong while sharing brain"
      );
    }
  }
};

const GetSharedBrain = async (hash?: string) => {
  if (!hash) {
    return "Please Provide a valid hash";
  }

  const res = await axios.get(`${API_URL}/share/openall/${hash}`, {
    withCredentials: true,
  });

  return res.data;
};

const CloseBrain = async () => {
  const res = await axios.post(
    `${API_URL}/share/closeall`,
    { share: false },
    { withCredentials: true }
  );

  return res.data;
};

const useShareBrain = (hash?: string) => {
  const queryclient = useQueryClient();

  const ShareBrainMutation = useMutation({
    mutationKey: ["shareContent"],
    mutationFn: ShareBrain,
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ["getSharedBrain"] });
      return data;
    },
    onError: (error) => {
      console.error("Failed to share brain", error);
      throw error;
    },
  });

  const CloseBrainMutation = useMutation({
    mutationKey: ["closeContent"],
    mutationFn: CloseBrain,
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ["getSharedBrain"] });
      return data;
    },
    onError: (error) => {
      console.error("Failed to close brain", error);
      throw error;
    },
  });

  const getSharedBrainQuery = useQuery({
    queryKey: ["getSharedBrain", hash],
    queryFn: () => GetSharedBrain(hash),
    enabled: !!hash,
    retry: false,
  });

  return { ShareBrainMutation, CloseBrainMutation, getSharedBrainQuery };
};

export default useShareBrain;
