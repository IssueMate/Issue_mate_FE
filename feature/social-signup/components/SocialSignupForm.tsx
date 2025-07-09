"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { KakaoSocialSignUpRequest } from "@/feature/social-signup/types/signup.types";
import registerKakaoUser from "@/feature/social-signup/api/register";
import PhoneAuthSection from "@/feature/phone-auth/components/PhoneAuthSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Phone, Shield, CheckCircle } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function SocialSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리에서 provider/kakaoId/email 등 가져옴
  const provider = searchParams.get("provider");
  const kakaoId = searchParams.get("kakaoId");
  const email = searchParams.get("email");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 휴대폰 번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");

    // 최대 11자리까지만 허용
    const truncated = numbers.slice(0, 11);

    // 길이에 따라 포맷팅
    if (truncated.length <= 3) {
      return truncated;
    }
    if (truncated.length <= 7) {
      return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
    }
    return `${truncated.slice(0, 3)}-${truncated.slice(3, 7)}-${truncated.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (phoneVerified) {
      setPhoneVerified(false);
    }
  };

  const handlePhoneVerified = () => {
    setPhoneVerified(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !termsAgreed) {
      setError("실명, 휴대폰번호, 약관동의 모두 필수입니다.");
      return;
    }
    if (!phoneVerified) {
      setError("휴대폰 인증을 완료해주세요.");
      return;
    }
    // 휴대폰 번호 유효성 검사
    const phoneNumbers = phone.replace(/[^\d]/g, "");
    if (phoneNumbers.length !== 11) {
      setError("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const payload: KakaoSocialSignUpRequest = {
        provider: provider ?? "kakao",
        kakaoId: kakaoId ?? undefined,
        email: email ?? undefined,
        name,
        phone,
        termsAgreed,
      };

      const res = await registerKakaoUser(payload);
      localStorage.setItem("jwt_token", res.token);
      router.replace("/dashboard");
    } catch (err) {
      setError((err as Error).message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 휴대폰 인증 비활성화 조건
  const isPhoneAuthDisabled = phone.replace(/[^\d]/g, "").length !== 11;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">회원가입</h1>
          <p className="text-gray-400">추가 정보를 입력해주세요</p>
        </div>

        <form
          className="space-y-6 p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-800"
          onSubmit={handleSubmit}
        >
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900/20 border-red-800 text-red-200"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {/* 실명 입력 */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-200 font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              실명
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
              autoComplete="name"
            />
          </div>

          {/* 휴대폰 번호 입력 및 인증 */}
          <div className="space-y-3">
            <Label
              htmlFor="phone"
              className="text-gray-200 font-medium flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              휴대폰번호
              {phoneVerified && (
                <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
              )}
            </Label>

            <Input
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="010-1234-5678"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
              autoComplete="tel"
              maxLength={13}
              disabled={phoneVerified}
            />

            <PhoneAuthSection
              phone={phone}
              disabled={isPhoneAuthDisabled}
              onVerified={handlePhoneVerified}
            />
          </div>

          {/* 약관 동의 */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <Checkbox
                id="terms"
                checked={termsAgreed}
                onCheckedChange={(checked: CheckedState) =>
                  setTermsAgreed(checked === true)
                }
                className="mt-0.5 border-2 border-gray-500 bg-gray-700 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
              />
              <div className="flex-1">
                <Label
                  htmlFor="terms"
                  className="text-gray-300 cursor-pointer flex items-start gap-2 leading-relaxed"
                >
                  <Shield className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>
                    <span className="text-red-400 font-medium">(필수)</span>{" "}
                    서비스 이용약관에 동의합니다.
                  </span>
                </Label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 transition-colors"
            disabled={loading}
          >
            {loading ? "가입 중..." : "가입하기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
