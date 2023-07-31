import { IconItem } from "@/components/common/Dropdown/IconDropdown/type";
import { ForumCategory } from "@/types/forum";
import { FormState } from "@/types/form";
import Checkbox from "@public/icons/checkbox.svg";
import Multiple from "@public/icons/multiple.svg";
import Paragraph from "@public/icons/paragraph.svg";

const CATEGORY_LIST: ForumCategory[] = ["개발 및 학습", "취업 및 채용", "취미 및 여가", "기타"];

const QUESTION_TYPE_LIST: IconItem[] = [
  { text: "단수응답", Icon: Checkbox, value: "checkbox" },
  { text: "복수응답", Icon: Multiple, value: "multiple" },
  { text: "주관식", Icon: Paragraph, value: "paragraph" },
];

const CATEGORY_FORUM_LIST: ("전체" | ForumCategory)[] = [
  "전체",
  "개발 및 학습",
  "취업 및 채용",
  "취미 및 여가",
  "기타",
];

const INITIAL_FORM: FormState = {
  form: {
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
  },
  question: [],
};

export { CATEGORY_LIST, QUESTION_TYPE_LIST, CATEGORY_FORUM_LIST, INITIAL_FORM };
