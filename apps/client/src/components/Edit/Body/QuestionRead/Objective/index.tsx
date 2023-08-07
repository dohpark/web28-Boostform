import React from "react";
import CheckboxEmpty from "@public/icons/checkboxEmpty.svg";
import MultipleEmpty from "@public/icons/multipleEmpty.svg";
import COLORS from "@/constants/color";
import { useFormStore } from "@/store/edit";

function Objective({ index }: { index: number }) {
  const { question } = useFormStore();
  const { option, type } = question[index];

  return (
    <div className="mt-5">
      {option.map(({ choiceId, value }) => (
        <div className="flex items-center mt-1" key={choiceId}>
          {type === "checkbox" && <CheckboxEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          {type === "multiple" && <MultipleEmpty height="20" width="20" fill={COLORS.grey3} viewBox="0 0 24 24" />}
          <div className="text-sm ml-2">{value}</div>
        </div>
      ))}
    </div>
  );
}

export default Objective;
