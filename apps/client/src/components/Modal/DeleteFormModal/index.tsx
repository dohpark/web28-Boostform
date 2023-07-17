import React from "react";
import formApi from "api/formApi";
import Button from "components/common/Button";
import DeleteFormModalProps from "./type";

function DeleteFormModal({ closeModal, refetchData, selectedFormId }: DeleteFormModalProps) {
  const onClickDeleteSurvey = async () => {
    await formApi.deleteForm(selectedFormId);
    refetchData();
    closeModal();
  };

  const onClickCancelDelete = () => closeModal();

  return (
    <div className="flex flex-col items-center justify-center absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] rounded p-9 z-20 bg-white">
      <div className="mb-5 text-base font-normal">삭제하시겠습니까?</div>
      <div className="flex justify-evenly">
        <Button
          type="button"
          onClick={onClickDeleteSurvey}
          className="bg-white border border-red1 text-red1 text-xs hover:bg-red0 active:translate-y-[1px] mr-3"
        >
          삭제
        </Button>
        <Button
          type="button"
          onClick={onClickCancelDelete}
          className="bg-white border border-blue2 text-blue2 text-xs hover:bg-blue0 active:translate-y-[1px]"
        >
          취소
        </Button>
      </div>
    </div>
  );
}

export default DeleteFormModal;
