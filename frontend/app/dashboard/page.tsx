"use client";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import ContentCard from "../components/ContentCard";

const Dashboard = () => {
  return (
    <div>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
      <Button className="bg-blue-300 text-black">Share Brain</Button>
      <Button className="bg-purple-800 text-black">Add Content</Button>
      <ContentCard
        type="twitter"
        link="https://x.com/shubh_exists/status/1872721660400591274"
        title="Twitter hai ji"
      />
    </div>
  );
};

export default Dashboard;
