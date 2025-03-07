"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTags } from "@/hooks/useGetTags";
import { axiosInstance } from "@/lib/axios";

type ContentType = "document" | "link" | "video" | "tweet";

interface IAddContent {
  type: ContentType;
  link: string;
  title: string;
  tags: string[];
}

interface AddContentCardProps {
  onClose: () => void;
}

const AddContentCard = ({ onClose }: AddContentCardProps) => {
  const [type, setType] = useState<ContentType>("link");
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const { getAllTagsQuery } = useTags();

  const queryClient = useQueryClient();

  const AddContent = async (add: IAddContent) => {
    const response = await axiosInstance.post("/content/add", add);
    return response.data;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["addContent"],
    mutationFn: AddContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      queryClient.invalidateQueries({ queryKey: ["sharedBrain"] });
      setType("link");
      setLink("");
      setTitle("");
      setTags([]);
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = { type, link, title, tags };
    mutateAsync(content);
  };

  const { isLoading, error } = getAllTagsQuery;

  if (isLoading) return <div>Loading...</div>;

  if (error) throw new Error("Error in fetching tags");

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-white">Type</Label>
          <Select
            onValueChange={(value) =>
              setType(value.toLowerCase() as ContentType)
            }
          >
            <SelectTrigger className="w-full border-gray-700 bg-[#333333] text-white">
              <SelectValue
                className="placeholder:text-gray-400"
                placeholder="Select a Type"
              />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-gray-700">
              <SelectGroup>
                <SelectItem value="Document">Document</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Tweet">Tweet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Link</Label>
          <Input
            disabled={isPending}
            required
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border-gray-700 bg-[#333333] text-white"
          />
        </div>

        <div>
          <Label className="text-white">Title</Label>
          <Input
            required
            disabled={isPending}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-700 bg-[#333333] text-white"
          />
        </div>

        <div>
          <Label className="text-white">Tags</Label>
          <Input
            required
            value={tags}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
            placeholder="Add Tags"
            className="border-gray-700 bg-[#333333] text-white placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Content"}
        </button>
      </form>
    </div>
  );
};

export default AddContentCard;
