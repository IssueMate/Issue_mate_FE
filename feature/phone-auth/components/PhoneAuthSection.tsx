"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Clock, RotateCcw, Send } from "lucide-react";
import { sendSmsAuthCode, verifySmsAuthCode } from "../api/sms";

type Props = {
  phone: string;
  disabled: boolean;
  onVerified: (code: string) => void;
};

export default function PhoneAuthSection({
  phone,
  disabled,
  onVerified,
}: Props) {
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // 카운트다운 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timeLeft > 0 && !verified) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft, verified]);

  // 시간을 MM:SS 형태로 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSend = async () => {
    setError("");
    setSuccess("");
    setSendLoading(true);

    try {
      await sendSmsAuthCode({ phone });
      setCodeSent(true);
      setTimeLeft(180); // 3분 = 180초
      setCode(""); // 인증번호 입력 필드 초기화
      setSuccess("인증번호가 전송되었습니다.");
    } catch (err) {
      setError((err as Error).message || "인증번호 전송 실패");
    } finally {
      setSendLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setSuccess("");
    setVerifyLoading(true);

    try {
      await verifySmsAuthCode({ phone, code });
      setVerified(true);
      setTimeLeft(0); // 타이머 정지
      setSuccess("인증 성공!");
      onVerified(code);
    } catch (err) {
      setError((err as Error).message || "인증 실패");
    } finally {
      setVerifyLoading(false);
    }
  };

  // 버튼 텍스트와 아이콘을 결정하는 함수
  const getButtonContent = () => {
    if (sendLoading) {
      return (
        <>
          <Clock className="w-4 h-4 mr-2 animate-spin" />
          전송 중...
        </>
      );
    }

    if (codeSent && timeLeft > 0) {
      return (
        <>
          <Clock className="w-4 h-4 mr-2" />
          재전송 ({formatTime(timeLeft)})
        </>
      );
    }

    if (codeSent && timeLeft === 0) {
      return (
        <>
          <RotateCcw className="w-4 h-4 mr-2" />
          인증번호 재전송
        </>
      );
    }

    return (
      <>
        <Send className="w-4 h-4 mr-2" />
        인증번호 받기
      </>
    );
  };

  if (verified) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-800 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span className="text-green-400 font-medium">인증 완료</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 인증번호 전송 버튼 */}
      <Button
        onClick={handleSend}
        disabled={disabled || sendLoading || (codeSent && timeLeft > 0)}
        type="button"
        className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 disabled:opacity-50"
        variant="outline"
      >
        {getButtonContent()}
      </Button>

      {/* 인증번호 입력 및 확인 */}
      {codeSent && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="인증번호 6자리 입력"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                }
                maxLength={6}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 pr-16"
              />
              {/* 타이머 표시 */}
              {timeLeft > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span
                    className={`text-sm font-mono ${timeLeft <= 30 ? "text-red-400" : "text-gray-400"}`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {timeLeft === 0 && codeSent && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm text-red-400 font-medium">
                    만료됨
                  </span>
                </div>
              )}
            </div>
            <Button
              onClick={handleVerify}
              disabled={
                verifyLoading || !code || code.length !== 6 || timeLeft === 0
              }
              type="button"
              className="bg-white hover:bg-gray-100 text-black font-medium px-6"
            >
              {verifyLoading ? "확인 중..." : "확인"}
            </Button>
          </div>

          {/* 타이머 안내 메시지 */}
          {timeLeft > 0 && (
            <p className="text-xs text-gray-500 text-center">
              인증번호는 {formatTime(timeLeft)} 후 만료됩니다.
            </p>
          )}

          {timeLeft === 0 && (
            <p className="text-xs text-red-400 text-center">
              인증번호가 만료되었습니다. 새로운 인증번호를 요청해주세요.
            </p>
          )}
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <Alert
          variant="destructive"
          className="bg-red-900/20 border-red-800 text-red-200"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 성공 메시지 */}
      {success && !verified && (
        <Alert className="bg-green-900/20 border-green-800 text-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
