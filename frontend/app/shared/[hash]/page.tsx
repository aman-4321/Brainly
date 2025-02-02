"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User2, Loader2 } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

export interface Tag {
  id: number;
  title: string;
}

export interface Content {
  id: number;
  title: string;
  link: string;
  type: "video" | "link" | "document" | "tweet";
  tags: Tag[];
}

export interface User {
  username: string;
  email: string;
}

export interface SharedBrainResponse {
  message: string;
  contents: Content[];
  user: User;
}

export default function SharedBrain({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const unwrappedParams = React.use(params);
  const hash = unwrappedParams.hash;

  const { data, isLoading, error } = useQuery<SharedBrainResponse>({
    queryKey: ["sharedBrain", hash],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/share/getall/${hash}`);
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          throw new Error("Invalid share link");
        }
        throw err;
      }
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Invalid Share Link
          </h1>
          <p className="text-xl text-gray-600">
            The link you are trying to access is invalid or has expired.
          </p>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <User2 className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.user.username}&apos;s Shared Brain
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.contents.map((content: Content, index: number) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ContentCard {...content} isShared={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
