"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import ContentCard from "../../components/ContentCard";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";
import AddContentCard from "@/components/AddContentCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ShareBrain from "@/components/ShareBrain";

const Dashboard = () => {
  const [ModalContent, setModalContent] = useState(false);
  const [ModalShare, setModalShare] = useState(false);
  const { getAllContentQuery } = useContent();

  const { data, isLoading, error } = getAllContentQuery;

  if (isLoading) return <div>Loading...</div>;

  const toggleModalAddContent = () => {
    setModalContent(!ModalContent);
  };

  const toggleModalShare = () => {
    setModalShare(!ModalShare);
  };

  return (
    <div
      className={`container mx-auto px-4 ${
        ModalShare || ModalContent ? "blur-sm" : ""
      }`}
    >
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
      <div className="flex items-end justify-end gap-2 mb-6">
        <Button onClick={toggleModalShare} className="bg-blue-300 text-black">
          Share Brain
        </Button>
        <Button
          onClick={toggleModalAddContent}
          className="bg-purple-800 text-white"
        >
          Add Content
        </Button>
      </div>

      <Dialog open={ModalShare} onOpenChange={setModalShare}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="text-lg font-semibold mb-4">
            Share Content
          </DialogTitle>
          <ShareBrain onClose={() => setModalShare(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={ModalContent} onOpenChange={setModalContent}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="text-lg font-semibold mb-4">
            Add New Content
          </DialogTitle>
          <AddContentCard onClose={() => setModalContent(false)} />
        </DialogContent>
      </Dialog>

      {error && <div>Error in loading content</div>}
      {data?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Brain Yet!
          </h3>
          <p className="text-gray-500">
            Start adding some content to your brain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.content?.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              type={item.type}
              link={item.link}
              title={item.title}
              tags={item.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
