"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Documents", path: "/dashboard/documents" },
    { name: "Videos", path: "/dashboard/videos" },
    { name: "Tweets", path: "/dashboard/tweets" },
    { name: "Links", path: "/dashboard/links" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
          Brainly
        </Link>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 ${
              pathname === item.path
                ? "bg-gray-100 border-l-4 border-blue-500"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
