import React from "react";
import ToggleButton from "@/components/common/ToggleButton";
import Button from "@/components/common/Button";
import Chain from "@public/icons/chain.svg";
import ShareFormModalProps from "./type";
import COLORS from "@/constants/color";

function ShareFormModal({
  formState,
  closeModal,
  changeLoginRequired,
  changeOnBoardShare,
  changeAcceptResponse,
  changeResponseModifiable,
  saveForm,
  copyLink,
}: ShareFormModalProps) {
  const { loginRequired, onBoard, acceptResponse, responseModifiable } = formState;
  const onClickCancel = () => closeModal();
  const onClickSave = () => {
    saveForm();
    closeModal();
  };

  return (
    <div className="absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] rounded p-9 z-20 bg-white">
      <div className="text-xl">공유설정</div>
      <div>
        <div className="flex justify-between items-center mt-3">
          <span>응답 받기</span>
          <ToggleButton state={acceptResponse} onClick={changeAcceptResponse} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>응답횟수 1회로 제한 (로그인 필수)</span>
          <ToggleButton state={loginRequired} onClick={changeLoginRequired} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>응답 수정 가능</span>
          <ToggleButton state={responseModifiable} onClick={changeResponseModifiable} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>게시판에 공유하기</span>
          <ToggleButton state={onBoard} onClick={changeOnBoardShare} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>링크</span>
          <Button type="button" onClick={copyLink} className="border-none bg-transparent text-xs p-0">
            <Chain fill={COLORS.blue3} height="24" width="24" />
            <span className="text-blue4 ml-2">링크 복사하기</span>
          </Button>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button type="button" onClick={onClickSave} className="bg-blue5 border border-grey2 text-white mr-3 text-sm">
          저장
        </Button>
        <Button type="button" onClick={onClickCancel} className="bg-blue5 border border-grey2 text-white text-sm">
          취소
        </Button>
      </div>
    </div>
  );
}

export default ShareFormModal;
