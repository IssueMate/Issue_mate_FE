/**
 * 일반 로그인 인증 정보 타입 (자체 회원)
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * 회원 공통 정보 타입
 */
export interface User {
  id: number;
  userEmail: string;
  name: string;
  provider?: string;
  providerId?: string;
  phone?: string;
}

/**
 * 로그인 응답 타입 (자체/소셜 공통)
 */
export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

/**
 * 소셜 로그인 응답 타입 (provider 명시)
 */
export interface SocialLoginResponse extends LoginResponse {
  provider: "kakao" | "google" | "facebook" | "apple";
}

/**
 * 카카오에서 받아온 회원 정보 (백엔드 KakaoUserInfoDto와 싱크)
 */
export interface KakaoUserInfoDto {
  email: string;
  nickname: string;
  kakaoId: string;
}

/**
 * 카카오 회원가입용 DTO (추가 정보 입력)
 */
export interface KakaoSocialSignUpDto {
  email: string;
  nickname: string;
  kakaoId: string;
  phone: string;
}
