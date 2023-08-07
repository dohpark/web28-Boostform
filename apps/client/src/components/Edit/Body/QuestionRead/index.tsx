import React, { useContext } from "react";
import Objective from "./Objective";
import Subjective from "./Subjective";
import { useFormStore } from "@/store/edit";

function QuestionRead({ index }: { index: number }) {
  const { question } = useFormStore();

  const { type } = question[index];
  return (
    <>
      {(type === "checkbox" || type === "multiple") && <Objective index={index} />}

      {type === "paragraph" && <Subjective />}
    </>
  );
}

export default QuestionRead;
