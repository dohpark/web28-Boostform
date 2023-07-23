import React from "react";
import { AnswerTotal } from "@/types/result";

function Paragraph({ answerTotal }: { answerTotal: AnswerTotal }) {
  const values = Object.entries(answerTotal);
  const moreThanTenElements = values.length > 10;
  const customCss = "max-h-[340px] overflow-y-scroll";
  const className = moreThanTenElements ? customCss : "";

  return (
    <div className={className}>
      {values.map(([key, value]) => (
        <div className="bg-grey0 mt-1 text-sm font-normal p-2 rounded" key={`${key}${value}`}>
          {key}
        </div>
      ))}
    </div>
  );
}

export default Paragraph;
