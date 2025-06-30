export interface KakaoSocialSignUpRequest {
  kakaoId?: string;
  provider: string;
  email?: string;
  name: string;
  phone: string;
  termsAgreed: boolean;
}

export interface KakaoSocialSignUpResponse {
  token: string;
  message: string;
}
