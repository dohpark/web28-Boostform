import React, { useEffect, useState } from "react";
import Error from "@public/icons/error.svg";
import MultipleFull from "@public/icons/multipleFull.svg";
import MultipleEmpty from "@public/icons/multipleEmpty.svg";
import IconButton from "@/components/common/IconButton";
import COLORS from "@/constants/color";
import { QuestionViewProps } from "../type";

function Multiple({
  questionState,
  addResponse,
  deleteResponse,
  editResponse,
  responseState,
  validationMode,
  validation,
  setValidation,
}: QuestionViewProps) {
  const { option, questionId, essential } = questionState;
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const selection =
      responseState.find(({ questionId: responseQuestionId }) => responseQuestionId === questionId)?.answer || [];
    setSelected(selection);
  }, [responseState, questionId]);

  const onClickSelectOption = (value: string) => {
    if (selected.length) editResponse(questionId, [...selected, value]);
    else addResponse({ questionId, answer: [value] });
    setSelected((prev) => [...prev, value]);
    setValidation((prev) => {
      if (essential) return { ...prev, [questionId]: true };
      return prev;
    });
  };

  const onClickDeselectOption = (value: string) => {
    if (selected.length === 1) {
      deleteResponse(questionId);
      setValidation((prev) => {
        if (essential) return { ...prev, [questionId]: false };
        return prev;
      });
    } else {
      const changedResponse = selected.filter((v) => v !== value);
      editResponse(questionId, changedResponse);
    }

    setSelected((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div className="mt-5">
      {option.map(({ choiceId, value }) => (
        <div className="flex items-center mt-1" key={choiceId}>
          {!selected.includes(value) && (
            <IconButton type="button" onClick={() => onClickSelectOption(value)}>
              <MultipleEmpty height="20" width="20" viewBox="0 0 24 24" />
            </IconButton>
          )}
          {selected.includes(value) && (
            <IconButton type="button" onClick={() => onClickDeselectOption(value)}>
              <MultipleFull height="20" width="20" fill={COLORS.blue3} viewBox="0 0 24 24" />
            </IconButton>
          )}
          <div className="text-sm ml-2 leading-7">{value}</div>
        </div>
      ))}
      {validationMode && !validation[questionId] && essential && (
        <div className="flex items-center mt-2 text-xs text-red1">
          <Error width="16" height="16" fill={COLORS.red1} />
          <span className="ml-1">필수 질문입니다!</span>
        </div>
      )}
    </div>
  );
}

export default Multiple;
