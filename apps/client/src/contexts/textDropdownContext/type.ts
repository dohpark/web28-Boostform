interface DropdownValueProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
}

export default DropdownValueProps;
