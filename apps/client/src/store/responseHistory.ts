import { create } from "zustand";

type ResponseHistoryState = {
  type: "submitResponse" | "duplicateResponse" | "endResponse" | "editResponse" | null;
  responseId: string | null;
};

type ResponseHistoryAction = {
  actions: {
    setType: (type: ResponseHistoryState["type"]) => void;
    setResponseId: (responseId: ResponseHistoryState["responseId"]) => void;
    reset: () => void;
  };
};

const useResponseHistory = create<ResponseHistoryState & ResponseHistoryAction>((set) => ({
  type: null,
  responseId: null,
  actions: {
    setType: (type) => set(() => ({ type })),
    setResponseId: (responseId) => set(() => ({ responseId })),
    reset: () => set(() => ({ type: null, responseId: null })),
  },
}));

export { useResponseHistory };
