"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, AlertCircle } from "lucide-react";

interface Props {
  onClose: () => void;
  kakaoId: string | null;
  email: string | null;
  name: string | null;
}

function SignupNeededModal({ onClose, kakaoId, email }: Props) {
  const router = useRouter();

  const handleSignup = () => {
    router.push(
      `/social-signup?provider=kakao&kakaoId=${kakaoId}&email=${email}`
    );
    onClose();
  };

  const handleCancel = () => {
    router.replace("/landing");
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full">
            <UserPlus className="w-8 h-8 text-gray-300" />
          </div>

          {/* Header */}
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-white">
              회원가입이 필요합니다
            </DialogTitle>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <AlertCircle className="w-4 h-4 text-gray-400" />
              <span>카카오 계정으로 가입된 회원정보가 없습니다</span>
            </div>
          </DialogHeader>

          {/* Description */}
          <p className="text-base text-gray-300 leading-relaxed max-w-sm">
            서비스를 이용하시려면 회원가입을 진행해주세요.
            <br />
            <span className="text-sm text-gray-500 mt-1 inline-block">
              카카오 계정으로 간편하게 가입할 수 있습니다.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <Button
              type="button"
              onClick={handleSignup}
              className="flex-1 bg-white hover:bg-gray-100 text-black font-medium shadow-sm"
            >
              회원가입 진행
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:text-white"
            >
              나중에 하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignupNeededModal;
