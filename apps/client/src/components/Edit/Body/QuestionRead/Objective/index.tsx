import React, { useContext } from "react";
import CheckboxEmpty from "@public/icons/checkboxEmpty.svg";
import MultipleEmpty from "@public/icons/multipleEmpty.svg";
import COLORS from "@/constants/color";
import { FormEditContext } from "@/contexts/formEditStoreProvider";
import { useStore } from "zustand";

function Objective({ index }: { index: number }) {
  const formEditStore = useContext(FormEditContext);
  if (!formEditStore) throw new Error("Missing FormEditContext.Provider in the tree");

  const { question } = useStore(formEditStore);
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
