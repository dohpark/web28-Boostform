import React from "react";
import { SkeletonType, SkeletonContainerProps } from "./type";

const getSkeletonTypeCss = (type: SkeletonType) => {
  switch (type) {
    case "text":
      return "w-full h-3 my-2 mx-0";
    case "title":
      return "w-1/2 h-5 mb-4 mt-2";
    case "formTitle":
      return "w-1/3 h-7 py-1 px-0 mt-2 mx-0 mb-5";
    case "formCategoryBox":
      return "w-[150px] h-[38px]";
    case "formQuestionTitleEdit":
      return "w-1/3 h-4 mt-7 mx-0 mb-5";
    case "formQuestionTitle":
      return "w-1/3 h-4 mb-5";
    case "button":
      return "w-[55px] h-[30px]";
    default:
      return "";
  }
};

function SkeletonContainer({ children, className: customCss }: SkeletonContainerProps) {
  const defaultCss = "my-5 mx-auto rounded relative overflow-hidden bg-grey0";
  const className = customCss ? `${defaultCss} ${customCss}` : defaultCss;

  return <div className={className}>{children}</div>;
}

function Element({ type }: { type: SkeletonType }) {
  const defaultCss = "rounded bg-grey2";
  const customCss = getSkeletonTypeCss(type);
  const className = `${defaultCss} ${customCss}`;

  return <div className={className} />;
}

function Shimmer() {
  return (
    <div className="animate-loading absolute top-0 left-0 w-full h-full">
      <div className="w-1/2 h-full bg-white bg-opacity-20 skew-x-[-20deg] shadow-[0_0_30px_30px_rgba(255,255,255,0.05)]" />
    </div>
  );
}

const Skeleton = Object.assign(SkeletonContainer, { Element, Shimmer });

export default Skeleton;
