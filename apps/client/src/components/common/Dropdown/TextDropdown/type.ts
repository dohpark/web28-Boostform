import { HTMLAttributes } from "react";

interface DropdownProps {
  state: string;
  defaultState: string;
  children: React.ReactNode;
  className?: string;
}

interface HeadProps {
  className?: string;
}

interface ItemProps {
  value: string;
  onClick: () => void;
  className?: string;
}

interface ItemListProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export type { DropdownProps, HeadProps, ItemProps, ItemListProps };
