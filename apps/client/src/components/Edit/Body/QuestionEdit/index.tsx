import React from "react";
import { useFormStore } from "@/store/edit";
import Objective from "./Objective";
import Subjective from "./Subjective";
import QuestionProps from "./type";

function Question({ index }: QuestionProps) {
  const { question } = useFormStore();

  const { type } = question[index];
  return (
    <>
      {(type === "checkbox" || type === "multiple") && <Objective index={index} />}

      {type === "paragraph" && <Subjective />}
    </>
  );
}

export default Question;
