import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type Tag = {
  id: number;
  title: string;
};

type Content = {
  id: number;
  link: string;
  type: "document" | "link" | "video" | "tweet";
  title: string;
  tags: Tag[];
  userId: number;
};

type ContentResponse = {
  content: Content[];
};

const fetchContent = async () => {
  const response = await axiosInstance.get("/content/get");

  if (response.status !== 200) {
    throw new Error("Error in fetching content");
  }
  return response.data;
};

export const useContent = () => {
  const getAllContentQuery = useQuery<ContentResponse>({
    queryKey: ["contents"],
    queryFn: fetchContent,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return { getAllContentQuery };
};
