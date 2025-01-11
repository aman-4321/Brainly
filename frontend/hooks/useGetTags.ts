import { API_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchTags = async (filter?: string) => {
  const response = await axios.get(
    `${API_URL}/content/tags${filter ? `?search=${filter}` : ""}`,
    {
      withCredentials: true,
    },
  );

  if (response.status !== 200) {
    throw new Error("Error while fetching tags");
  }

  return response.data.tags;
};

export const useTags = (filter?: string) => {
  const getAllTagsQuery = useQuery({
    queryKey: ["tags", filter],
    queryFn: () => fetchTags(filter),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return { getAllTagsQuery };
};
