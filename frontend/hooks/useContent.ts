import { API_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const response = await axios.get(`${API_URL}/content/get`, {
    withCredentials: true,
  });

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
  });

  return { getAllContentQuery };
};
