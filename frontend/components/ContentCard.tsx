import useDeleteContent from "@/hooks/useDeleteContent";
import { NotebookIcon, Share2Icon, Trash2 } from "lucide-react";

interface CardProps {
  id: number;
  title: string;
  link: string;
  type: "document" | "link" | "video" | "tweet";
  tags?: {
    id: number;
    title: string;
  }[];
}

function ContentCard({ id, link, title, type, tags }: CardProps) {
  const { deleteContent } = useDeleteContent();

  const { mutateAsync: Deletecontent, isPending } = deleteContent;

  const handleDelete = async () => {
    if (!id) {
      console.error("NO content Id provided");
      return;
    }
    try {
      if (window.confirm("Are you sure you want to delete this content")) {
        await Deletecontent(Number(id));
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="h-full">
      <div className="h-full p-6 border-gray-200 border bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <NotebookIcon className="w-5 h-5 mr-3 text-gray-600" />
            <h3 className="font-medium text-gray-900">{title}</h3>
          </div>
          <div className="flex space-x-2">
            <a
              href={link}
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <Share2Icon className="w-5 h-5" />
            </a>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              {tag.title}
            </span>
          ))}
        </div>

        <div className="mt-4">
          {type === "video" && (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={link.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {type === "tweet" && (
            <blockquote className="twitter-tweet">
              <a href={link}></a>
            </blockquote>
          )}
          {type === "document" && (
            <a
              href={link}
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
              target="_blank"
            >
              View Document →
            </a>
          )}
          {type === "link" && (
            <a
              href={link}
              className="inline-block text-blue-600 hover:text-blue-800 truncate w-full"
              target="_blank"
            >
              {link}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
