interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
}

export type { ButtonProps };
