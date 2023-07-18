import { ForumCategory, OrderBy } from "@/types/forum";

interface FormList {
  formId: string;
  title: string;
  category: string;
  responseCount: number;
}

interface ForumApi {
  form: FormList[];
  lastPage: number;
}

interface SearchParams {
  page: number;
  category: ForumCategory;
  keyword: string;
  orderBy: OrderBy;
}

export type { FormList, ForumApi, SearchParams };
