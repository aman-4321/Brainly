"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Image from "next/image";

interface ISignin {
  email: string;
  password: string;
}

const Signin = (data: ISignin) => {
  return axiosInstance.post("/user/signin", data);
};

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutateAsync, error, isError, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: Signin,
    onSuccess: () => {
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync({ email, password });
  };

  return (
    <div className="flex min-h-screen w-full bg-[#212121] p-10">
      {/* Left side with image taking up half the screen */}
      <div className="w-1/2 relative hidden md:block bg-blue-600 px-8 py-10 rounded-2xl">
        <div className="h-full w-full flex items-center justify-center">
          <Image
            src="https://app.usefindr.com/_next/image?url=%2Fstatic%2Fimages%2Fmisc%2Fhero_2.webp&w=1920&q=75"
            alt="Sign in"
            width={1000}
            height={1000}
            className="h-[40rem] w-[40rem] rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Right side with form taking up half the screen */}
      <div className="w-full md:w-1/2 bg-[#212121] flex items-center justify-center p-4">
        <div className="w-full max-w-lg px-8">
          <h1 className="text-5xl font-bold text-white mb-16 text-center">
            Brainly
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
            {isError && (
              <div className="bg-red-500/20 text-red-300 p-4 rounded-md text-base">
                {error?.message || "Sign in failed. Please try again."}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center text-gray-400 pl-3">
                <FaEnvelope className="text-xl" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 py-4 bg-transparent text-lg text-white border-b border-gray-500 focus:border-blue-500 focus:outline-none transition-all"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center text-gray-400 pl-3">
                <FaLock className="text-xl" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 py-4 bg-transparent text-lg text-white border-b border-gray-500 focus:border-blue-500 focus:outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md text-lg font-medium transition-colors mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center text-gray-300 mt-10 text-lg">
              New user?{" "}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
