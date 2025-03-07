import Link from "next/link";

export default function SharePage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#212121] text-white p-4">
      <h1 className="text-3xl font-semibold mb-4">Invalid Share Link</h1>
      <p className="text-gray-300">
        Please use a valid link to access shared content.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
