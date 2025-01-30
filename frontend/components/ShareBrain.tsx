"use client";

import useShareBrain from "@/hooks/useShareBrain";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Copy, X, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const ShareBrain = ({ onClose }: { onClose: () => void }) => {
  const { CloseBrainMutation, ShareBrainMutation, getSharedBrainQuery } =
    useShareBrain();
  const [isShared, setIsShared] = useState(!!getSharedBrainQuery.data?.link);

  useEffect(() => {
    setIsShared(!!getSharedBrainQuery.data?.link);
  }, [getSharedBrainQuery.data?.link]);

  if (getSharedBrainQuery.isLoading) return <div>Loading...</div>;
  if (getSharedBrainQuery.error) return <div>Error...</div>;

  const handleShare = async () => {
    try {
      if (!isShared) {
        await ShareBrainMutation.mutateAsync();
      } else {
        await CloseBrainMutation.mutateAsync();
      }
    } catch (error) {
      console.error("Error toggling share state:", error);
    }
  };

  const copyToClipboard = () => {
    if (getSharedBrainQuery.data?.link) {
      navigator.clipboard.writeText(getSharedBrainQuery.data.link);
    }
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div className="flex items-center justify-between border-b pb-4">
        <span className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Share Brain
        </span>
        <Switch
          checked={isShared}
          onCheckedChange={(checked) => {
            setIsShared(checked);
            handleShare();
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="text-sm text-gray-500">
          Status: {isShared ? "Public" : "Private"}
        </div>

        {isShared ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Link:</span>
              <Input
                readOnly
                value={getSharedBrainQuery.data?.link || "Generating link..."}
                className="flex-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
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
