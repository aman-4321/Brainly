"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ISignup {
  username: string;
  email: string;
  password: string;
}

const Signup = (data: ISignup) => {
  return axios.post(`${API_URL}/user/signup`, data, { withCredentials: true });
};

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutateAsync, error, isError, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: Signup,
    onSuccess: () => {
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync({ username, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {error.message || "An error occurred during sign in"}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="text"
                required
                type="text"
                placeholder="john1234"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                required
                type="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                disabled={isPending}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
