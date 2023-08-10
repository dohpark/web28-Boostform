import { create } from "zustand";

type MyFormsState = {
  modalType: "delete" | "change";
  selectedFormId: string;
};

type MyFormsAction = {
  actions: {
    setModalType: (focus: MyFormsState["modalType"]) => void;
    setSelectedFormId: (hover: MyFormsState["selectedFormId"]) => void;
  };
};

const useMyForms = create<MyFormsState & MyFormsAction>((set) => ({
  modalType: "delete",
  selectedFormId: "",
  actions: {
    setModalType: (modalType) => set(() => ({ modalType })),
    setSelectedFormId: (selectedFormId) => set(() => ({ selectedFormId })),
  },
}));

export { useMyForms };
