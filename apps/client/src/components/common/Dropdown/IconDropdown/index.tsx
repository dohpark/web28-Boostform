import React, { useState } from "react";
import OutsideDetecter from "@/hooks/useOutsideDetecter";
import { IconDropdownProps } from "./type";
import Dropdown from "@public/icons/dropdown.svg";

function IconDropdown({ state, setState, items, defaultValue }: IconDropdownProps) {
  const findIcon = (str: string) => {
    const target = items.find(({ value }) => value === str);
    if (target) return target.icon;
    return null;
  };

  const findText = (str: string) => {
    const target = items.find(({ value }) => value === str);
    if (target) return target.text;
    return null;
  };

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(findIcon(state));
  const [selectedText, setSelectedText] = useState<string | null>(findText(state) || defaultValue);

  return (
    <div className="relative w-[220px]">
      <button
        className="border flex p-2 items-center w-full h-full border-grey3 rounded bg-transparent cursor-pointer"
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        {/* {selectedIcon ? <Icon type={selectedIcon} size="16px" /> : null} */}
        <span className="w-full text-left ml-2 text-sm">{selectedText}</span>
        <Dropdown width="16" height="16" />
      </button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <ul className="w-full absolute z-10 bg-white py-2 px-0 rounded border border-grey3">
            {items.map(({ value, icon, text }) => (
              <li key={value} className="text-left hover:bg-grey1">
                <button
                  className="flex item p-2 w-full border-0 bg-transparent cursor-pointer"
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();
                    setSelectedIcon(findIcon(value));
                    setSelectedText(findText(value));
                    setOpen(false);
                    setState(value);
                  }}
                >
                  {/* <Icon type={icon} size="16px" /> */}
                  <span className="w-full text-left ml-2 text-sm">{text}</span>
                </button>
              </li>
            ))}
          </ul>
        </OutsideDetecter>
      )}
    </div>
  );
}

export default IconDropdown;
