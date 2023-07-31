import React, { useState } from "react";
import OutsideDetecter from "@/hooks/useOutsideDetecter";
import { IconDropdownProps } from "./type";
import Dropdown from "@public/icons/dropdown.svg";

function IconDropdown({ state, setState, items, defaultValue }: IconDropdownProps) {
  const findItem = (str: string) => {
    const targetIndex = items.find((item) => {
      if (item.value === str) return item;
    });
    return targetIndex;
  };

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(findItem(state));

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
        {selectedItem ? (
          <>
            <span>
              <selectedItem.Icon width="16px" height="16px" viewBox="0 0 24 24" />
            </span>
            <span className="w-full text-left ml-2 text-sm">{selectedItem.text}</span>
          </>
        ) : null}
        <Dropdown width="16" height="16" />
      </button>

      {open && (
        <OutsideDetecter callback={() => setOpen(false)}>
          <ul className="w-full absolute z-10 bg-white py-2 px-0 rounded border border-grey3">
            {items.map(({ value, text, Icon }) => (
              <li key={value} className="text-left hover:bg-grey1">
                <button
                  className="flex item p-2 w-full border-0 bg-transparent cursor-pointer"
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.stopPropagation();
                    setSelectedItem(findItem(value));
                    setOpen(false);
                    setState(value);
                  }}
                >
                  <Icon width="16px" height="16px" viewBox="0 0 24 24" />
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
