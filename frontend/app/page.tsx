import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen">
      <div>
        <nav className="border-b-[1px] border-gray-300 shadow-md py-6 px-6 bg-white relative z-10 flex items-center justify-between">
          <div className="font-bold text-xl">Brainly</div>

          <div className="flex space-x-8">
            <div>Product</div>
            <div>Resources</div>
            <div>Download</div>
            <div>Pricing</div>
            <div>FAQ</div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="cursor-pointer">Sign In</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600">
              Get Started
            </button>
          </div>
        </nav>
      </div>

      <div className="flex flex-col font-extrabold justify-center items-center pt-20">
        <h2 className="text-8xl">Unlock infinite memory</h2>
        <h2 className="text-8xl mt-2">with your second brain</h2>
      </div>

      <div className="flex flex-col justify-center items-center pt-20 text-slate-500 font-semibold text-xl">
        <p>
          One platform to organise, search, and utilise information scattered
          across apps,
        </p>
        <p>bookmarks, links, notes, and files</p>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 text-lg mt-10">
          Get you second brain
        </button>
      </div>

      <div className="flex justify-center items-center pt-20 relative">
        <div className="relative">
          <Image
            className="border rounded-xl"
            alt="image"
            width={1300}
            height={1500}
            src="https://www.usefindr.com/_next/image?url=%2Fstatic%2Fimages%2Ffeatures%2Fmemory-wall.webp&w=1920&q=75"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent rounded-b-xl"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-20 font-bold text-4xl">
        <p>Trusted by researchers, thinkers, and</p>
        <p>superhumans who work at</p>
      </div>

      <div className="flex flex-col justify-center items-center pt-20 font-bold text-4xl">
        <div>Some carousal here</div>
      </div>
    </div>
  );
}
