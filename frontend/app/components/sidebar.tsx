import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-400 w-1/6 flex flex-col space-y-4 p-4">
      <Link href="/dashboard" className="pb-5 font-bold">
        Second Brain
      </Link>
      <h5>Tweets</h5>
      <h5>Videos</h5>
      <h5>Documents</h5>
      <h5>Links</h5>
      <h5>Tags</h5>
    </div>
  );
}
