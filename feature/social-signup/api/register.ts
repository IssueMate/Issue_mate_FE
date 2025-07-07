import type {
  KakaoSocialSignUpRequest,
  KakaoSocialSignUpResponse,
} from "../types/signup.types";

export default async function registerKakaoUser(
  payload: KakaoSocialSignUpRequest
): Promise<KakaoSocialSignUpResponse> {
  const response = await fetch("http://localhost:8080/auth/kakao/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}
