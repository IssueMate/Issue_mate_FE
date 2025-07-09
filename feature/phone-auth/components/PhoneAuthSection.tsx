"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sendSmsAuthCode, verifySmsAuthCode } from "../api/sms";
import { CheckCircle, Clock, Send } from "lucide-react";

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

  const handleSend = async () => {
    setError("");
    setSuccess("");
    setSendLoading(true);

    try {
      await sendSmsAuthCode({ phone });
      setCodeSent(true);
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

    if (codeSent) {
      return (
        <>
          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
          인증번호 전송됨
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
        disabled={disabled || sendLoading || codeSent}
        type="button"
        className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
        variant="outline"
      >
        {getButtonContent()}
      </Button>

      {/* 인증번호 입력 및 확인 */}
      {codeSent && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="인증번호 6자리 입력"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
              }
              maxLength={6}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
            />
            <Button
              onClick={handleVerify}
              disabled={verifyLoading || !code || code.length !== 6}
              type="button"
              className="bg-white hover:bg-gray-100 text-black font-medium px-6"
            >
              {verifyLoading ? "확인 중..." : "확인"}
            </Button>
          </div>
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
