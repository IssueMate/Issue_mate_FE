import {
  SmsSendRequest,
  SmsVerifyRequest,
} from "@/feature/phone-auth/types/sms.types";

export async function sendSmsAuthCode({ phone }: SmsSendRequest) {
  const res = await fetch(
    `http://localhost:8080/sms/send?phone=${encodeURIComponent(phone)}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "인증번호 전송 실패");
  return data;
}

export async function verifySmsAuthCode({ phone, code }: SmsVerifyRequest) {
  const res = await fetch(
    `http://localhost:8080/sms/verify?phone=${encodeURIComponent(phone)}&code=${encodeURIComponent(code)}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "인증번호 검증 실패");
  return data;
}
