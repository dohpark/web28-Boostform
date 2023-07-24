import React, { useContext, useEffect, useMemo, useState } from "react";
import OutsideDetecter from "@/hooks/useOutsideDetecter";
import TextDropdownContext from "@/contexts/textDropdownContext";
import DropdownIcon from "@public/icons/dropdown.svg";
import { DropdownProps, HeadProps, ItemProps, ItemListProps } from "./type";

function Dropdown({ children, state, defaultState }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(state || defaultState);

  useEffect(() => {
    setSelected(state);
  }, [state]);

  const DropdownContextValue = useMemo(() => ({ open, setOpen, selected, setSelected }), [open, selected]);

  return (
    <TextDropdownContext.Provider value={DropdownContextValue}>
      <div className="relative w-[150px]">{children}</div>
    </TextDropdownContext.Provider>
  );
}

function Head({ className: customCss }: HeadProps) {
  const { setOpen, selected } = useContext(TextDropdownContext);
  const defaultCss = "flex items-center w-full rounded-sm bg-transparent cursor-pointer";
  const className = `${defaultCss} ${customCss}`;

  return (
    <button
      className={className}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (setOpen) setOpen((prev) => !prev);
      }}
    >
      <span className="w-full text-left ml-2">{selected}</span>
      <DropdownIcon height="16" width="16" />
    </button>
  );
}

function ItemList({ children, className: customCss }: ItemListProps) {
  const { open, setOpen } = useContext(TextDropdownContext);

  const defaultCss = "w-full absolute z-10 py-2 rounded-sm bg-white border border-grey3";
  const className = `${defaultCss} ${customCss}`;

  return open ? (
    <OutsideDetecter callback={() => setOpen && setOpen(false)}>
      <ul className={className}>{children}</ul>
    </OutsideDetecter>
  ) : null;
}

function Item({ value, onClick, className: customCss }: ItemProps) {
  const { setSelected, setOpen } = useContext(TextDropdownContext);

  const defaultCss = "flex items-center p-2 w-full border-none bg-transparent cursor-pointer";
  const className = `${defaultCss} ${customCss}`;

  return (
    <li className="text-left hover:bg-grey1 text-sm">
      <button
        className={className}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (setSelected) setSelected(value);
          if (setOpen) setOpen(false);
          onClick();
        }}
      >
        <span className="w-full text-left ml-2">{value}</span>
      </button>
    </li>
  );
}

const TextDropdown = Object.assign(Dropdown, { Head, Item, ItemList });

export default TextDropdown;
