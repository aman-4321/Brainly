"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { API_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ContentType = "document" | "link" | "video" | "tweet";

interface IAddContent {
  type: ContentType;
  link: string;
  title: string;
  tag: string[];
}

const AddContent = async (add: IAddContent) => {
  const response = await axios.post(`${API_URL}/content/add`, add, {
    withCredentials: true,
  });
  return response.data;
};

const AddContentCard = () => {
  const [type, setType] = useState<ContentType>("link");
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["addContent"],
    mutationFn: AddContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      setType("link");
      setLink("");
      setTitle("");
      setTags([]);
    },
  });

  if (error) return <div>error {error.message}</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = { type, link, title, tag: tags };
    mutateAsync(content);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* TODO:  Add Option or dropdown here */}
        <Label>Type</Label>
        <Input
          required
          disabled={isPending}
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value as ContentType)}
        />
        <Label>Link</Label>
        <Input
          disabled={isPending}
          required
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Label>Title</Label>
        <Input
          required
          disabled={isPending}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Tags</Label>
        {/* TODO: Add the logic of adding tags and fetching all the available tags */}
        <Input
          required
          disabled={isPending}
          type="text"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Content"}
        </button>
      </form>
    </div>
  );
};

export default AddContentCard;
