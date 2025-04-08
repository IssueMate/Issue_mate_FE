import type {
  LoginCredentials,
  LoginResponse,
  SocialLoginResponse,
} from "@/feature/login/types/login.types";

/**
 * 일반 로그인 처리 함수
 */
export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    // 실제 API 호출 구현
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // 개발 중에는 임시 지연 및 성공 응답 (실제 구현 시 제거)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 실제 구현 시 아래 주석 해제
    // if (!response.ok) {
    //   const errorData = await response.json()
    //   return {
    //     success: false,
    //     message: errorData.message || '로그인에 실패했습니다.'
    //   }
    // }

    // const data = await response.json()
    // return {
    //   success: true,
    //   user: data.user,
    //   token: data.token
    // }

    // 개발용 임시 응답 (실제 구현 시 제거)
    console.log("로그인 시도:", credentials);
    return {
      success: true,
      user: { id: "1", email: credentials.email, name: "테스트 사용자" },
      token: "dummy-token-12345",
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
export async function loginWithKakao(): Promise<SocialLoginResponse> {
  try {
    // 카카오 SDK 초기화 및 로그인 처리
    // 실제 구현 시 카카오 SDK를 사용하여 구현

    // 개발 중에는 임시 지연 및 성공 응답 (실제 구현 시 제거)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("카카오 로그인 시도");

    // 카카오 로그인 성공 후 백엔드에 인증 요청
    // const response = await fetch('/api/auth/kakao', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ accessToken: kakaoToken }),
    // })

    // if (!response.ok) {
    //   const errorData = await response.json()
    //   return {
    //     success: false,
    //     message: errorData.message || '카카오 로그인에 실패했습니다.'
    //   }
    // }

    // const data = await response.json()
    // return {
    //   success: true,
    //   user: data.user,
    //   token: data.token
    // }

    // 개발용 임시 응답 (실제 구현 시 제거)
    return {
      success: true,
      user: {
        id: "kakao-123",
        email: "kakao@example.com",
        name: "카카오 사용자",
      },
      token: "kakao-dummy-token-12345",
      provider: "kakao",
    };
  } catch (error) {
    console.error("카카오 로그인 오류:", error);
    return {
      success: false,
      message:
        "카카오 로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      provider: "kakao",
    };
  }
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
