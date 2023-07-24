import React from "react";
import IconButton from "@/components/common/IconButton";
import TextButton from "@/components/common/TextButton";
import COLORS from "@/constants/color";
import CheckboxEmpty from "@public/icons/checkboxEmpty.svg";
import MultipleEmpty from "@public/icons/multipleEmpty.svg";
import Close from "@public/icons/close.svg";
import ObjectiveProps from "./type";

function Objective({ index, questionState, addQuestionChoice, modifyChoice, deleteChoice }: ObjectiveProps) {
  const { option, type } = questionState;

  return (
    <div>
      {option.map(({ choiceId, value }, choiceIndex) => (
        <div className="flex items-center mt-1" key={choiceId}>
          {type === "checkbox" && <CheckboxEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          {type === "multiple" && <MultipleEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          <input
            className="w-[calc(100%-77px)] text-sm border-b border-b-white leading-7 ml-2 hover:border-b hover:border-b-grey3 focus:outline-none focus:border-b focus:border-b-black"
            value={value}
            onInput={(e: React.FormEvent<HTMLInputElement>) => modifyChoice(index, choiceIndex, e.currentTarget.value)}
          />
          {questionState.option.length > 1 && (
            <IconButton type="button" onClick={() => deleteChoice(index, choiceIndex)}>
              <Close height="16" width="16" />
            </IconButton>
          )}
        </div>
      ))}
      <div className="flex items-center mt-1">
        {type === "checkbox" && <CheckboxEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
        {type === "multiple" && <MultipleEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
        <div className="ml-2">
          <TextButton type="button" onClick={() => addQuestionChoice(index)} className="text-grey5 text-sm">
            옵션 추가
          </TextButton>
        </div>
      </div>
    </div>
  );
}

export default Objective;
