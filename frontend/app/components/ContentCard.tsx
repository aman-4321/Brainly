import { NotebookIcon, Share2Icon, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "video";
}

function ContentCard({ link, title, type }: CardProps) {
  return (
    <div>
      <div className="p-4 border-gray-200 max-w-96 border bg-white rounded-md outline-slate-200">
        <div className="flex justify-between">
          <div className="flex">
            <NotebookIcon className="mr-4" />
            {title}
          </div>
          <div className="flex">
            <a href={link} target="_blank">
              <Share2Icon className="mr-4" />
            </a>
            <Trash2 />
          </div>
        </div>
        <div className="pt-4">
          {type === "video" && (
            <iframe
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </p>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
