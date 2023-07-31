import { IconType } from "@/types/icons";

interface IconItem {
  value: IconType;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

interface IconDropdownProps {
  defaultValue: string;
  state: IconType;
  setState: (value: IconType) => void;
  items: IconItem[];
}

export type { IconItem, IconDropdownProps };
