import React from "react";
import Error from "@public/icons/error.svg";
import { QuestionViewProps } from "../type";
import COLORS from "@/constants/color";

function Paragraph({
  questionState,
  addResponse,
  deleteResponse,
  editResponse,
  responseState,
  validationMode,
  validation,
  setValidation,
}: QuestionViewProps) {
  const { questionId, essential } = questionState;
  const selection =
    responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer[0] || null;

  const onInputEditAnswer: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      deleteResponse(questionId);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: false };
        return prev;
      });
    } else if (value.length === 1) {
      addResponse({ questionId, answer: [value] });
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: true };
        return prev;
      });
    } else {
      editResponse(questionId, [value]);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: true };
        return prev;
      });
    }
  };

  return (
    <>
      <input
        className="w-full mt-2 block py-1 px-0 border-b border-b-grey3 focus:outline-none focus:border-b focus:border-b-black leading-7 text-sm"
        placeholder="내 답변"
        defaultValue={selection || ""}
        onInput={onInputEditAnswer}
      />
      {validationMode && !validation[questionId] && essential && (
        <div className="flex items-center mt-2 text-xs text-red1">
          <Error width="16" height="16" fill={COLORS.red1} />
          <span className="ml-1">필수 질문입니다!</span>
        </div>
      )}
    </>
  );
}

export default Paragraph;
