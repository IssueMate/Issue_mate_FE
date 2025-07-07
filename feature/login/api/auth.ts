import type {
  LoginCredentials,
  LoginResponse,
  SocialLoginResponse,
} from "@/feature/login/types/login.types";

/**
 * 일반 로그인 처리 함수 -> 추후 일반 로그인 API 개발 시 사용할 것
 */
export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    // 임시 API 호출 구현
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "로그인에 실패했습니다.",
      };
    }

    const data = await response.json();
    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.error("로그인 오류:", error);
    return {
      success: false,
      message: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 카카오 소셜 로그인 처리 함수
 */
export function loginWithKakao() {
  window.location.href = "http://localhost:8080/auth/kakao/login";
}

/**
 * 아이디 찾기 함수
 */
export async function findId(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/auth/find-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // 실제 구현 시 아래 주석 해제
    // const data = await response.json()
    // return { success: response.ok, message: data.message }

    // 개발용 임시 응답
    return {
      success: true,
      message: "등록된 이메일로 아이디 정보를 발송했습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 비밀번호 재설정 함수
 */
export async function resetPassword(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // 실제 구현 시 아래 주석 해제
    // const data = await response.json()
    // return { success: response.ok, message: data.message }

    // 개발용 임시 응답
    return {
      success: true,
      message: "등록된 이메일로 비밀번호 재설정 링크를 발송했습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
