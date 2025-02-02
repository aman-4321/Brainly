import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const fetchTags = async (filter?: string) => {
  const response = await axiosInstance.get(
    `/content/tags${filter ? `?search=${filter}` : ""}`,
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
