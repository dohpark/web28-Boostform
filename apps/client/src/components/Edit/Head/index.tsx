import TextDropdown from "@/components/common/Dropdown/TextDropdown";
import { FormEditContext } from "@/contexts/formEditStoreProvider";
import { useEditStore } from "@/store/edit";
import { CATEGORY_LIST } from "@/store/form";
import { ForumCategory } from "@/types/forum";
import { useContext } from "react";
import { useStore } from "zustand";

function Head() {
  const { actions: editStateActions } = useEditStore();
  const formEditStore = useContext(FormEditContext);
  if (!formEditStore) throw new Error("Missing FormEditContext.Provider in the tree");

  const { form, actions: formActions } = useStore(formEditStore);

  const onClickTitle = () => {
    editStateActions.setFocus("title");
  };

  const onClickSelectCategory = (value: ForumCategory) => {
    formActions.selectCategory(value);
  };

  const onInputTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    formActions.changeTitle(e.target.value);
  };

  const onInputDescription: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    formActions.changeDescription(e.target.value);
  };

  return (
    <div className="mt-9 bg-white rounded p-5" onClick={() => onClickTitle()}>
      <input
        className="w-full block text-2xl py-1 px-0 border-b border-b-grey3 leading-9 focus:outline-none focus:border-b focus:border-b-black"
        onInput={onInputTitle}
        value={form.title}
        placeholder="제목을 작성해주세요"
      />
      <input
        className="w-full mt-2 mb-4 block text-base py-1 px-0 border-b border-grey3 leading-7 focus:outline-none focus:border-b focus:border-black"
        onInput={onInputDescription}
        value={form.description}
        placeholder="설문지에 대한 간단한 설명을 작성해주세요"
      />
      <TextDropdown state={form.category} defaultState="카테고리">
        <TextDropdown.Head className="border border-grey3 p-2 text-black text-sm" />
        <TextDropdown.ItemList>
          {CATEGORY_LIST.map((value) => (
            <TextDropdown.Item key={value} value={value} onClick={() => onClickSelectCategory(value)} />
          ))}
        </TextDropdown.ItemList>
      </TextDropdown>
    </div>
  );
}

export default Head;
