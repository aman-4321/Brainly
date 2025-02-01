"use client ";

import { useEffect, useState } from "react";
import useShareBrain from "@/hooks/useShareBrain";
import { Button } from "@/components/ui/button";
import { Copy, X, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const ShareBrain = ({ onClose }: { onClose: () => void }) => {
  const { CloseBrainMutation, ShareBrainMutation, getSharedBrainQuery } =
    useShareBrain();
  const [isShared, setIsShared] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  // Get the link from the query data first, then fallback to mutation data
  const link =
    getSharedBrainQuery.data?.link || ShareBrainMutation.data?.link || null;

  useEffect(() => {
    console.log("Query Data:", getSharedBrainQuery.data);
    console.log("Is Shared:", isShared);
  }, [getSharedBrainQuery.data, isShared]);

  // Initialize state from query data
  useEffect(() => {
    // Set initial state as soon as we get the query data
    if (getSharedBrainQuery.data?.link) {
      setIsShared(true);
    }
  }, [getSharedBrainQuery.data]);

  // Update state when mutations complete
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
    } catch (error) {
      console.error("Error toggling share:", error);
      // Revert the local state if the mutation fails
      setIsShared(!isShared);
    }
  };

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopyMessage("Link copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  // Show loading state only during initial load
  if (getSharedBrainQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div className="flex items-center justify-between border-b pb-4">
        <span className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Share Brain
        </span>
        <Switch
          checked={isShared}
          onCheckedChange={handleToggle}
          disabled={
            ShareBrainMutation.isPending || CloseBrainMutation.isPending
          }
        />
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-500">
          Status: {isShared ? "Public" : "Private"}
        </div>
        {link ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Link:</span>
              <Input readOnly value={link} className="flex-1" />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={
                  ShareBrainMutation.isPending || CloseBrainMutation.isPending
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                {copyMessage || "Copy Link"}
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Enable sharing to generate a link
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareBrain;
