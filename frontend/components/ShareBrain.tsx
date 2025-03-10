"use client ";

import { useEffect, useState } from "react";
import useShareBrain from "@/hooks/useShareBrain";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ShareBrain = () => {
  const { CloseBrainMutation, ShareBrainMutation, getSharedBrainQuery } =
    useShareBrain();
  const [isShared, setIsShared] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const link =
    getSharedBrainQuery.data?.link || ShareBrainMutation.data?.link || null;

  useEffect(() => {}, [getSharedBrainQuery.data, isShared]);

  useEffect(() => {
    if (getSharedBrainQuery.data?.link) {
      setIsShared(true);
    }
  }, [getSharedBrainQuery.data]);

  useEffect(() => {
    if (ShareBrainMutation.isSuccess) {
      setIsShared(true);
    }
    if (CloseBrainMutation.isSuccess) {
      setIsShared(false);
    }
  }, [ShareBrainMutation.isSuccess, CloseBrainMutation.isSuccess]);

  const handleToggle = async () => {
    try {
      if (!isShared) {
        await ShareBrainMutation.mutateAsync();
      } else {
        await CloseBrainMutation.mutateAsync();
      }
    } catch {
      setIsShared(!isShared);
    }
  };

  if (getSharedBrainQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const getFullUrl = (hash: string) => {
    return `${window.location.origin}/shared/${hash}`;
  };

  const rawLink =
    getSharedBrainQuery.data?.link || ShareBrainMutation.data?.link || null;
  const sharedlink = rawLink ? getFullUrl(rawLink) : null;

  const handleLinkClick = () => {
    if (sharedlink) {
      window.open(sharedlink, "_blank");
    }
  };

  const copyToClipboard = () => {
    if (sharedlink) {
      navigator.clipboard.writeText(sharedlink);
      setCopyMessage("Link copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return (
    <div className="space-y-6 p-4 border border-gray-700 rounded-lg bg-[#333333]">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <span className="flex items-center gap-2 text-white">
          <Link2 className="h-5 w-5" />
          Share Brain
        </span>
        <Switch
          checked={isShared}
          onCheckedChange={handleToggle}
          disabled={
            ShareBrainMutation.isPending || CloseBrainMutation.isPending
          }
          className="data-[state=checked]:bg-blue-600"
        />
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-300 flex justify-center pb-2">
          Status: {isShared ? "Public" : "Private"}
        </div>
        {link ? (
          <div className="flex justify-center gap-4">
            <Button
              size="sm"
              onClick={handleLinkClick}
              disabled={
                ShareBrainMutation.isPending || CloseBrainMutation.isPending
              }
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Visit Link
            </Button>
            <Button
              size="sm"
              onClick={copyToClipboard}
              disabled={
                ShareBrainMutation.isPending || CloseBrainMutation.isPending
              }
              className="bg-transparent border border-gray-700 text-white hover:bg-gray-800"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copyMessage || "Copy Link"}
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            Enable sharing to generate a link
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareBrain;
