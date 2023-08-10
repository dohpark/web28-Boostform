import React from "react";
import CheckboxEmpty from "@public/icons/checkboxEmpty.svg";
import MultipleEmpty from "@public/icons/multipleEmpty.svg";
import Close from "@public/icons/close.svg";
import IconButton from "@/components/common/IconButton";
import TextButton from "@/components/common/TextButton";
import COLORS from "@/constants/color";
import { useFormStore } from "@/store/edit";
import ObjectiveProps from "./type";

function Objective({ index }: ObjectiveProps) {
  const { question, actions: formActions } = useFormStore();
  const { option, type } = question[index];

  const onClickAddQuestionOption = (questionIndex: number) => {
    formActions.addQuestionOption(questionIndex);
  };

  const onInputChangeQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    formActions.changeQuestionOption(questionIndex, optionIndex, value);
  };

  const onClickDeleteQuestionOption = (questionIndex: number, optionIndex: number) => {
    formActions.deleteQuestionOption(questionIndex, optionIndex);
  };

  return (
    <div>
      {option.map(({ choiceId, value }, optionIndex) => (
        <div className="flex items-center mt-1" key={choiceId}>
          {type === "checkbox" && <CheckboxEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          {type === "multiple" && <MultipleEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          <input
            className="w-[calc(100%-77px)] text-sm border-b border-b-white leading-7 ml-2 hover:border-b hover:border-b-grey3 focus:outline-none focus:border-b focus:border-b-black"
            value={value}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              onInputChangeQuestionOption(index, optionIndex, e.currentTarget.value)
            }
          />
          {question[index].option.length > 1 && (
            <IconButton type="button" onClick={() => onClickDeleteQuestionOption(index, optionIndex)}>
              <Close height="16" width="16" />
            </IconButton>
          )}
        </div>
      ))}
      <div className="flex items-center mt-1">
        {type === "checkbox" && <CheckboxEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
        {type === "multiple" && <MultipleEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
        <div className="ml-2">
          <TextButton type="button" onClick={() => onClickAddQuestionOption(index)} className="text-grey5 text-sm">
            옵션 추가
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default Objective;
