"use client";

import { Button } from "@/components/ui/button";
import Script from "next/script";
import ContentCard from "@/components/ContentCard";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";
import AddContentCard from "@/components/AddContentCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ShareBrain from "@/components/ShareBrain";
import { Brain, LogOut, Plus, Share } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [modalContent, setModalContent] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const { getAllContentQuery } = useContent();
  const { data, isLoading, error } = getAllContentQuery;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      router.push("/signin");
    } catch {}
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#212121] text-white">
        Loading...
      </div>
    );

  const toggleModalAddContent = () => setModalContent(!modalContent);
  const toggleModalShare = () => setModalShare(!modalShare);

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />

      <header className="bg-[#212121] border-b border-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-white">Brainly</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleModalShare}
              className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 flex items-center space-x-2"
            >
              <Share className="h-4 w-4" />
              <span>Share Brain</span>
            </Button>
            <Button
              onClick={toggleModalAddContent}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Content</span>
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-transparent border border-gray-700 text-white hover:bg-gray-800 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Dialog open={modalShare} onOpenChange={setModalShare}>
          <DialogContent className="sm:max-w-[500px] bg-[#2a2a2a] text-white border-gray-700">
            <DialogTitle className="text-lg font-semibold mb-4 text-white">
              Share Content
            </DialogTitle>
            <ShareBrain />
          </DialogContent>
        </Dialog>

        <Dialog open={modalContent} onOpenChange={setModalContent}>
          <DialogContent className="sm:max-w-[500px] bg-[#2a2a2a] text-white border-gray-700">
            <DialogTitle className="text-lg font-semibold mb-4 text-white">
              Add New Content
            </DialogTitle>
            <AddContentCard onClose={() => setModalContent(false)} />
          </DialogContent>
        </Dialog>

        {error && (
          <div className="text-red-300 bg-red-500/20 p-4 rounded-md mb-6">
            Error in loading content
          </div>
        )}

        {data?.content?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center bg-[#2a2a2a] rounded-lg shadow-md">
            <Brain className="h-16 w-16 text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Brain Yet!
            </h3>
            <p className="text-gray-300 mb-4">
              Start adding some content to your brain.
            </p>
            <Button
              onClick={toggleModalAddContent}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Your First Content
            </Button>
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
      </main>
    </div>
  );
};

export default Dashboard;
