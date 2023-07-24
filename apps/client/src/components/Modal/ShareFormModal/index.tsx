import React from "react";
import ToggleButton from "@/components/common/ToggleButton";
import Button from "@/components/common/Button";
import Chain from "@public/icons/chain.svg";
import ShareFormModalProps from "./type";
import COLORS from "@/constants/color";
import { useFormStore } from "@/store/edit";
import { fromFormToApi } from "@/utils/form";
import { toast } from "react-toastify";
import formApi from "@/api/formApi";
import { useParams } from "next/navigation";

function ShareFormModal({ closeModal }: ShareFormModalProps) {
  const { id } = useParams();
  const { form, question, actions: formActions } = useFormStore();
  const { loginRequired, onBoard, acceptResponse, responseModifiable } = form;

  const onClickChangeLoginRequired = () => {
    formActions.changeLoginRequired();
  };

  const onClickChangeOnBoardShare = () => {
    formActions.changeOnBoardShared();
  };

  const onClickChangeAcceptResponse = () => {
    formActions.changeAcceptResponse();
  };

  const onClickChangeResponseModifiable = () => {
    formActions.changeResponseModifiable();
  };

  const onClickCopyLink = () => {
    window.navigator.clipboard.writeText(`${"127.0.0.1:3000"}/forms/${id}/view`);
    toast.success("링크가 복사되었습니다!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const saveForm = () => {
    if (!id) return;
    if (!form.title) {
      toast.error("제목을 작성해주세요!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!form.category) {
      toast.error("카테고리를 정해주세요!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const apiData = fromFormToApi({ form, question });
    formApi.saveForm(id as string, apiData);
    toast.success("저장이 완료되었습니다.!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
          <ToggleButton state={acceptResponse} onClick={onClickChangeAcceptResponse} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>응답횟수 1회로 제한 (로그인 필수)</span>
          <ToggleButton state={loginRequired} onClick={onClickChangeLoginRequired} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>응답 수정 가능</span>
          <ToggleButton state={responseModifiable} onClick={onClickChangeResponseModifiable} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>게시판에 공유하기</span>
          <ToggleButton state={onBoard} onClick={onClickChangeOnBoardShare} />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span>링크</span>
          <Button type="button" onClick={onClickCopyLink} className="border-none bg-transparent text-xs p-0">
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
