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

const CloseBrain = async () => {
  const res = await axios.post(
    `${API_URL}/share/closeall`,
    { share: false },
    { withCredentials: true }
  );

  return res.data;
};

const useShareBrain = () => {
  const queryclient = useQueryClient();

  const getSharedBrainQuery = useQuery({
    queryKey: ["getSharedBrain"],
    queryFn: async () => {
      const statusRes = await axios.get(`${API_URL}/share/status`, {
        withCredentials: true,
      });

      if (statusRes.data.isShared && statusRes.data.hash) {
        return {
          link: statusRes.data.hash,
          isShared: true,
        };
      }

      return { link: null, isShared: false };
    },
    retry: 0,
    refetchOnMount: true,
    staleTime: 0,
  });

  const ShareBrainMutation = useMutation({
    mutationKey: ["shareContent"],
    mutationFn: ShareBrain,
    onSuccess: (data) => {
      queryclient.setQueryData(["getSharedBrain"], {
        link: data.link,
        isShared: true,
      });
      return data;
    },
  });

  const CloseBrainMutation = useMutation({
    mutationKey: ["closeContent"],
    mutationFn: CloseBrain,
    onSuccess: (data) => {
      queryclient.setQueryData(["getSharedBrain"], {
        link: null,
        isShared: false,
      });
      return data;
    },
  });

  return { ShareBrainMutation, CloseBrainMutation, getSharedBrainQuery };
};

export default useShareBrain;
