import { FormStoreType } from "@/store/edit";
import { createContext } from "react";

export const FormEditContext = createContext<FormStoreType | null>(null);
