import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";
import { toast } from "react-toastify";

import IconDropdown from "@/components/common/Dropdown/IconDropdown";
import Question from "@/components/Edit/Body/QuestionEdit";
import ToggleButton from "@/components/common/ToggleButton";
import QuestionRead from "@/components/Edit/Body/QuestionRead";
import IconButton from "@/components/common/IconButton";
import { QUESTION_TYPE_LIST } from "@/store/form";
import { useEditStore, useFormStore } from "@/store/edit";

import DragIndicator from "@public/icons/dragIndicator.svg";
import Add from "@public/icons/add.svg";
import Copy from "@public/icons/copy.svg";
import Trashcan from "@public/icons/trashcan.svg";
import { QuestionType } from "@/types/form";

function Body() {
  const { focus, drag, hover, actions: editStateActions } = useEditStore();
  const { question, actions: formActions } = useFormStore();

  const onClickQuestion = (index: number) => {
    editStateActions.setFocus(`q${index}`);
  };

  const onMouseOverQuestion = (index: number) => {
    editStateActions.setHover(`q${index}`);
  };
  const onMouseOutQuestion = () => {
    editStateActions.setHover("");
  };

  const onInputQuestionTitle = (value: string, questionIndex: number) => {
    formActions.changeQuestionTitle(value, questionIndex);
  };

  const onClickSetQuestionType = (value: QuestionType, questionIndex: number) => {
    formActions.changeQuestionType(value, questionIndex);
  };

  const onClickCopyQuestion = (questionIndex: number) => {
    formActions.copyQuestion(questionIndex);
  };

  const onClickAddQuestion = (questionIndex: number) => {
    formActions.addQuestion(questionIndex);
  };

  const onClickDeleteQuestion = (questionIndex: number) => {
    if (question.length === 1) {
      toast.error("삭제가 불가능합니다!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    formActions.deleteQuestion(questionIndex);
  };

  const onClickChangeQuestionEssential = (questionIndex: number) => {
    formActions.changeQuestionEssential(questionIndex);
  };

  const onDragStart = (initial: DragStart) => {
    const { source } = initial;
    editStateActions.setDrag(`q${source.index}`);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    editStateActions.setDrag("");
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    formActions.changeQuestionOrder(source.index, destination.index);

    editStateActions.setFocus(`q${destination.index}`);
  };

  const showDragIndicator = (index: number) => {
    if (focus === `q${index}`) return true;
    if (drag === `q${index}`) return true;
    if (drag && drag !== hover) return false;
    if (hover === `q${index}`) return true;
    return false;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="formQuestions">
        {(droppable) => (
          <div ref={droppable.innerRef} {...droppable.droppableProps}>
            {question.map(({ questionId, title, type, essential }, questionIndex) => (
              <Draggable draggableId={questionId.toString()} index={questionIndex} key={questionId}>
                {(draggable) => {
                  let transform = draggable.draggableProps.style?.transform;

                  if (transform) {
                    transform = transform.replace(/([0-9]+px)/, "0px");
                    draggable.draggableProps.style = {
                      ...draggable.draggableProps.style,
                      transform,
                    };
                  }

                  return (
                    <div
                      className="mt-4 bg-white rounded pt-0 pb-5 px-5 border border-grey3 relative overflow-hidden"
                      onClick={() => onClickQuestion(questionIndex)}
                      onMouseOver={() => onMouseOverQuestion(questionIndex)}
                      onMouseOut={() => onMouseOutQuestion()}
                      {...draggable.draggableProps}
                      ref={draggable.innerRef}
                    >
                      <div className="h-[30px] flex justify-center py-1 px-0" {...draggable.dragHandleProps}>
                        {showDragIndicator(questionIndex) ? <DragIndicator height="16" width="16" /> : null}
                      </div>
                      {focus === `q${questionIndex}` && (
                        <>
                          <div className="flex justify-between">
                            <input
                              className="block w-3/5 text-base py-2 px-3 border-b border-b-grey3 bg-grey1 rounded focus:outline-none focus:border-b focus:border-b-black leading-7"
                              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                onInputQuestionTitle(e.currentTarget.value, questionIndex)
                              }
                              value={question[questionIndex].title}
                              placeholder="질문"
                            />
                            <IconDropdown
                              state={type}
                              setState={(questionType: string) => {
                                const isQuestionType = (str: string): str is QuestionType =>
                                  str === "checkbox" || str === "multiple" || str === "paragraph";

                                if (isQuestionType(questionType)) onClickSetQuestionType(questionType, questionIndex);
                              }}
                              items={QUESTION_TYPE_LIST}
                              defaultValue="선택해주세요"
                            />
                          </div>
                          <div className="py-2 px-0">
                            <Question index={questionIndex} />
                          </div>
                          <hr className="h-[1px] border-0 bg-grey2" />
                          <div className="flex items-center justify-end mt-4">
                            <IconButton
                              type="button"
                              onClick={() => onClickAddQuestion(questionIndex)}
                              className="mr-3"
                            >
                              <Add height="21" width="21" viewBox="0 0 24 24" />
                            </IconButton>
                            <IconButton
                              type="button"
                              onClick={() => onClickCopyQuestion(questionIndex)}
                              className="mr-3"
                            >
                              <Copy height="18" width="18" viewBox="0 0 24 24" />
                            </IconButton>
                            <IconButton
                              type="button"
                              onClick={() => onClickDeleteQuestion(questionIndex)}
                              className="mr-3"
                            >
                              <Trashcan width="18" height="18" viewBox="0 0 24 24" />
                            </IconButton>
                            <div className="flex items-center border-l border-l-grey3 py-2 px-3">
                              <span className="text-base mr-2">필수</span>
                              <ToggleButton
                                state={essential}
                                onClick={() => onClickChangeQuestionEssential(questionIndex)}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      {focus !== `q${questionIndex}` && (
                        <>
                          <div>{title}</div>
                          <QuestionRead index={questionIndex} />
                        </>
                      )}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {droppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Body;
