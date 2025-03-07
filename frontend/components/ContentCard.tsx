"use client";

import { motion } from "framer-motion";
import useDeleteContent from "@/hooks/useDeleteContent";
import {
  NotebookIcon,
  Trash2,
  ExternalLink,
  Youtube,
  Twitter,
  FileText,
  LinkIcon,
} from "lucide-react";
import { Tweet } from "react-tweet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  id: number;
  title: string;
  link: string;
  type: "document" | "link" | "video" | "tweet";
  tags?: {
    id: number;
    title: string;
  }[];
  isShared?: boolean;
}

function ContentCard({
  id,
  link,
  title,
  type,
  tags,
  isShared = false,
}: CardProps) {
  const { deleteContentMutation } = useDeleteContent();
  const { mutateAsync: deleteContent, isPending } = deleteContentMutation;

  const handleDelete = async () => {
    if (!id) {
      return;
    }
    try {
      if (window.confirm("Are you sure you want to delete this content?")) {
        await deleteContent(Number(id));
      }
    } catch {}
  };

  const getIcon = () => {
    switch (type) {
      case "video":
        return <Youtube className="w-5 h-5 text-blue-500" />;
      case "tweet":
        return <Twitter className="w-5 h-5 text-blue-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "link":
        return <LinkIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <NotebookIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "video":
        return (
          <div className="aspect-video rounded-md overflow-hidden">
            <iframe
              className="w-full h-full"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        );
      case "tweet":
        return (
          <div className="flex justify-center">
            <Tweet id={link.split("/").pop() || ""} />
          </div>
        );
      case "document":
        return (
          <div className="bg-[#333333] p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-6 h-6 text-blue-500" />
              <span className="font-medium text-gray-200">
                Document Preview
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-4 line-clamp-3">{title}</p>
            <a
              href={link}
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Full Document</span>
            </a>
          </div>
        );
      case "link":
        return (
          <div className="bg-[#333333] p-4 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <LinkIcon className="w-6 h-6 text-blue-500" />
              <span className="font-medium text-gray-200">Link Preview</span>
            </div>
            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{title}</p>
            <a
              href={link}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden bg-[#2a2a2a] border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getIcon()}
              <span className="text-lg font-semibold text-white truncate">
                {title}
              </span>
            </div>
            {!isShared && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isPending}
                className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">{renderContent()}</CardContent>
        <CardFooter>
          <div
            key={`tag-container-${id}`}
            className="flex flex-wrap gap-2 mt-2"
          >
            {tags?.map((tag, index) => (
              <Badge
                key={tag.id ?? `tag-index-${index}`}
                variant="secondary"
                className="bg-blue-900/30 text-blue-300 hover:bg-blue-800/40"
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ContentCard;
