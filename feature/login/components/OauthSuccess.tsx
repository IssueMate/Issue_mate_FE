"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OauthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1200);
    } else {
      router.replace("/landing");
    }
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">로그인 성공!</h2>
      <p className="text-gray-600">잠시만 기다려주세요...</p>
    </div>
  );
}
