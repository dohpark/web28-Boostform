type SkeletonType =
  | "text"
  | "title"
  | "formTitle"
  | "formCategoryBox"
  | "formQuestionTitle"
  | "button"
  | "formQuestionTitleEdit"
  | "loginButton";

interface SkeletonContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type { SkeletonType, SkeletonContainerProps };
