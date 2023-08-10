import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

function LoginModal() {
  const router = useRouter();

  const onClickLogin = () => {
    router.push("/login");
  };

  return (
    <div className="absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] rounded p-6 z-20 bg-white">
      <h2 className="mb-5 text-xl font-normal">계속 하려면 로그인</h2>
      <p className="mb-4 text-sm">이 설문지를 작성하려면 로그인해야 합니다. 신원은 익명으로 유지됩니다.</p>
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onClickLogin}
          className="bg-white border border-blue2 text-blue2 text-xs hover:text-blue0 active:translate-y-[1px]"
        >
          로그인
        </Button>
      </div>
    </div>
  );
}

export default LoginModal;
