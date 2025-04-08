"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { login, loginWithKakao } from "@/feature/login/api/auth";
import type { LoginCredentials } from "@/feature/login/types/login.types";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const credentials: LoginCredentials = { email, password };
      const result = await login(credentials);

      if (result.success) {
        // 로그인 성공 시 리다이렉트 또는 상태 업데이트
        window.location.href = "/dashboard";
      } else {
        setError(
          result.message ||
            "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
        );
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      const result = await loginWithKakao();

      if (result.success) {
        window.location.href = "/dashboard";
      } else {
        setError(result.message || "카카오 로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("카카오 로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center">
          <div className="mx-auto mb-4">
            <Image
              src="/images/logo.png"
              alt="IssueMate 로고"
              width={200}
              height={80}
              priority
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            로그인
          </DialogTitle>
          <DialogDescription className="text-center">
            IssueMate에 오신 것을 환영합니다
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              아이디
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                placeholder="아이디를 입력하세요"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center text-sm space-x-4">
            <Link href="/find-id" className="text-yellow-600 hover:underline">
              아이디 찾기
            </Link>
            <Link
              href="/reset-password"
              className="text-yellow-600 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90 border-[#FEE500]"
            onClick={handleKakaoLogin}
            disabled={isLoading}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0.5C4.02944 0.5 0 3.69067 0 7.66667C0 10.1204 1.55389 12.2718 3.93111 13.5296C3.69333 14.3784 3.21778 16.0093 3.12556 16.3982C3.01333 16.8667 3.3 16.8644 3.52889 16.7178C3.71 16.6009 5.74333 15.2098 6.59778 14.6404C7.37 14.7784 8.17667 14.8333 9 14.8333C13.9706 14.8333 18 11.6427 18 7.66667C18 3.69067 13.9706 0.5 9 0.5Z"
                fill="black"
              />
            </svg>
            카카오 계정으로 로그인
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-yellow-600 hover:underline">
              회원가입
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
