"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import LoginModal from "@/feature/login/components/login-modal";
import SignupNeededModal from "@/feature/login/components/signup-needed-modal";

export default function Page() {
  const searchParams = useSearchParams();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const kakaoId = searchParams.get("kakaoId");
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  useEffect(() => {
    if (searchParams.get("signupNeeded")) {
      setShowSignupModal(true);
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">IssueMate</h1>
        <p className="text-xl text-muted-foreground">
          이슈 관리를 더 쉽고 효율적으로
        </p>
      </div>
      <LoginModal />
      {showSignupModal && (
        <SignupNeededModal
          onClose={() => setShowSignupModal(false)}
          kakaoId={kakaoId}
          email={email}
          name={name}
        />
      )}
    </main>
  );
}
