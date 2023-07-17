import React, { useState } from "react";
import formApi from "@/api/formApi";
import Button from "@/components/common/Button";
import EditFormNameModalProps from "./type";

function EditFormNameModal({ closeModal, selectedFormId, refetchData }: EditFormNameModalProps) {
  const [title, setTitle] = useState("");

  const onClickChangeName = async () => {
    await formApi.editName(selectedFormId, title || "제목 없음");
    refetchData();
    closeModal();
  };
  const onClickCancelChangeName = () => closeModal();

  const onInputChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] rounded p-6 z-20 bg-white">
      <h2 className="mb-4 text-base font-normal">제목 바꾸기</h2>
      <div className="mb-4 text-sm">항목의 새 제목을 입력하세요</div>
      <input
        className="w-full py-1 px-2 border border-grey3 rounded mb-6 text-sm"
        onInput={onInputChangeName}
        placeholder="제목 없음"
      />
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onClickChangeName}
          className="bg-white border border-blue2 text-blue2 text-xs mr-3 hover:bg-blue0 active:translate-y-[1px]"
        >
          확인
        </Button>
        <Button
          type="button"
          onClick={onClickCancelChangeName}
          className="bg-white border border-blue2 text-blue2 text-xs hover:bg-blue0 active:translate-y-[1px]"
        >
          취소
        </Button>
      </div>
    </div>
  );
}

export default EditFormNameModal;
