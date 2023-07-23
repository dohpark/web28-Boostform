import { createContext } from "react";
import DropdownValueProps from "./type";

const TextDropdownContext = createContext<DropdownValueProps>({ open: false });

export default TextDropdownContext;
