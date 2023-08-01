import React, { useContext } from "react";
import Objective from "./Objective";
import Subjective from "./Subjective";
import { FormEditContext } from "@/contexts/formEditStoreProvider";
import { useStore } from "zustand";

function QuestionRead({ index }: { index: number }) {
  const formEditStore = useContext(FormEditContext);
  if (!formEditStore) throw new Error("Missing FormEditContext.Provider in the tree");

  const { question } = useStore(formEditStore);

  const { type } = question[index];
  return (
    <>
      {(type === "checkbox" || type === "multiple") && <Objective index={index} />}

      {type === "paragraph" && <Subjective />}
    </>
  );
}

export default QuestionRead;
