import { FormState, QuestionState, QuestionType } from "@/types/form";
import { ForumCategory } from "@/types/forum";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

const INITIAL_FORM = {
  id: "example",
  userId: 3,
  title: "",
  description: "",
  category: "기타",
  acceptResponse: false,
  onBoard: false,
  loginRequired: false,
  responseModifiable: false,
  currentQuestionId: 1,
};

type EditState = {
  focus: string;
  hover: string;
  drag: string;
};

type EditAction = {
  actions: {
    setFocus: (focus: EditState["focus"]) => void;
    setHover: (hover: EditState["hover"]) => void;
    setDrag: (drag: EditState["drag"]) => void;
  };
};

const useEditStore = create<EditState & EditAction>((set) => ({
  focus: "",
  hover: "",
  drag: "",
  actions: {
    setFocus: (focus) => set(() => ({ focus: focus })),
    setHover: (hover) => set(() => ({ hover: hover })),
    setDrag: (drag) => set(() => ({ drag: drag })),
  },
}));

type FormAction = {
  actions: {
    changeTitle: (title: string) => void;
    changeDescription: (description: string) => void;
    changeQuestionTitle: (title: string, questionIndex: number) => void;
    changeQuestionType: (type: QuestionType, questionIndex: number) => void;
    addQuestionOption: (questionIndex: number) => void;
    changeQuestionOption: (questionIndex: number, optionIndex: number, value: string) => void;
    deleteQuestionOption: (questionIndex: number, optionIndex: number) => void;
    deleteQuestion: (questionIndex: number) => void;
    copyQuestion: (questionIndex: number) => void;
    addQuestion: (questionIndex: number) => void;
    changeQuestionEssential: (questionIndex: number) => void;
    selectCategory: (category: ForumCategory) => void;
    fetchData: (init: FormState) => void;
    changeLoginRequired: () => void;
    changeOnBoardShared: () => void;
    changeAcceptResponse: () => void;
    changeResponseModifiable: () => void;
    changeQuestionOrder: (originIndex: number, destinationIndex: number) => void;
  };
};

const useFormStore = create(
  immer<FormState & FormAction>((set) => ({
    form: INITIAL_FORM,
    question: [],
    actions: {
      changeTitle: (title: string) =>
        set(({ form }) => {
          form.title = title;
        }),
      changeDescription: (description: string) =>
        set(({ form }) => {
          form.description = description;
        }),
      changeQuestionTitle: (title: string, questionIndex: number) =>
        set(({ question }) => {
          question[questionIndex].title = title;
        }),
      changeQuestionType: (type: QuestionType, questionIndex: number) =>
        set(({ question }) => {
          const prevType = question[questionIndex].type;

          if ((prevType === "checkbox" || prevType === "multiple") && type === "paragraph") {
            question[questionIndex].type = type;
            question[questionIndex].option = [];
          } else if (prevType === "paragraph" && (type === "checkbox" || type === "multiple")) {
            question[questionIndex].type = type;
            question[questionIndex].option = [{ choiceId: 1, value: "옵션1" }];
            question[questionIndex].currentChoiceId = 1;
          } else {
            question[questionIndex].type = type;
          }
        }),
      addQuestionOption: (questionIndex: number) =>
        set(({ question }) => {
          const optionLength = question[questionIndex].option.length;
          const { currentChoiceId } = question[questionIndex];

          question[questionIndex].currentChoiceId = currentChoiceId + 1;
          question[questionIndex].option.push({ choiceId: currentChoiceId + 1, value: `옵션${optionLength + 1}` });
        }),
      changeQuestionOption: (questionIndex: number, optionIndex: number, value: string) =>
        set(({ question }) => {
          question[questionIndex].option[optionIndex].value = value;
        }),
      deleteQuestionOption: (questionIndex: number, optionIndex: number) =>
        set(({ question }) => {
          question[questionIndex].option.splice(optionIndex, 1);
        }),
      deleteQuestion: (questionIndex: number) =>
        set(({ question }) => {
          question.splice(questionIndex, 1);
        }),
      copyQuestion: (questionIndex: number) =>
        set(({ question, form }) => {
          const { currentQuestionId } = form;
          const originalQuestion = question[questionIndex];
          const clone = produce(originalQuestion, (draft) => {
            draft.questionId = currentQuestionId + 1;
          });

          form.currentQuestionId = currentQuestionId + 1;
          question.splice(questionIndex, 0, clone);
        }),
      addQuestion: (questionIndex: number) =>
        set(({ question, form }) => {
          const { currentQuestionId } = form;
          const newQuestion: QuestionState = {
            questionId: currentQuestionId + 1,
            currentChoiceId: 1,
            page: question[questionIndex].page,
            type: "checkbox",
            essential: false,
            etcAdded: false,
            title: "질문",
            option: [
              {
                choiceId: 1,
                value: "옵션1",
              },
            ],
          };
          question.splice(questionIndex + 1, 0, newQuestion);
        }),
      changeQuestionEssential: (questionIndex: number) =>
        set(({ question }) => {
          question[questionIndex].essential = !question[questionIndex].essential;
        }),
      selectCategory: (category: ForumCategory) =>
        set(({ form }) => {
          form.category = category;
        }),
      fetchData: (init: FormState) => set(() => ({ question: init.question, form: init.form })),
      changeLoginRequired: () =>
        set(({ form }) => {
          form.loginRequired = !form.loginRequired;
        }),
      changeOnBoardShared: () =>
        set(({ form }) => {
          form.onBoard = !form.onBoard;
        }),
      changeAcceptResponse: () =>
        set(({ form }) => {
          form.acceptResponse = !form.acceptResponse;
        }),
      changeResponseModifiable: () =>
        set(({ form }) => {
          form.responseModifiable = !form.responseModifiable;
        }),
      changeQuestionOrder: (originIndex: number, destinationIndex: number) =>
        set(({ question }) => {
          const grabbedQuestion = question.slice(originIndex, originIndex + 1);

          question.splice(originIndex, 1);
          question.splice(destinationIndex, 0, ...grabbedQuestion);
        }),
    },
  }))
);

export { useEditStore, useFormStore };
