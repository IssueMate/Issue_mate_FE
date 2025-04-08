/**
 * 로그인 인증 정보 타입
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * 사용자 정보 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

/**
 * 소셜 로그인 응답 타입
 */
export interface SocialLoginResponse extends LoginResponse {
  provider?: "kakao" | "google" | "facebook" | "apple";
}
