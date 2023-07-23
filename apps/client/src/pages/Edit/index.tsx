"use client";

/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";

import formApi from "@/api/formApi";
import FormLayout from "@/components/template/Layout";
import IconDropdown from "@/components/common/Dropdown/IconDropdown";
import Question from "@/components/Edit/QuestionEdit";
import ToggleButton from "@/components/common/ToggleButton";
import QuestionRead from "@/components/Edit/QuestionRead";
import TextDropdown from "@/components/common/Dropdown/TextDropdown";
import Skeleton from "@/components/common/Skeleton";
import ShareFormModal from "@/components/Modal/ShareFormModal";
import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import useModal from "@/hooks/useModal";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import writeReducer from "@/reducer/formEdit";
import { CATEGORY_LIST, INITIAL_FORM, QUESTION_TYPE_LIST } from "@/store/form";
import { FormDataApi, QuestionType } from "@/types/form";
import { fromApiToForm, fromFormToApi } from "@/utils/form";

import DragIndicator from "@public/icons/dragIndicator.svg";
import Add from "@public/icons/add.svg";
import Copy from "@public/icons/copy.svg";
import Trashcan from "@public/icons/trashcan.svg";

import { useParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.min.css";

function Edit() {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id as string);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: fetchForm,
    refetchOnWindowFocus: false,
    retry: 2,
    useErrorBoundary: true,
  });

  const [state, dispatch] = useReducer(writeReducer, INITIAL_FORM);
  const { form, question } = state;
  const [focus, setFocus] = useState("");
  const [hover, setHover] = useState("");
  const [drag, setDrag] = useState("");

  const { openModal, closeModal, ModalPortal } = useModal();
  const delayLoading = useLoadingDelay(isLoading);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) dispatch({ type: "FETCH_DATA", init: fromApiToForm(data, "edit") });
  }, [data, id, isSuccess]);

  const onClickTitle = () => {
    setFocus("title");
  };
  const onClickQuestion = (index: number) => {
    setFocus(`q${index}`);
  };

  const onMouseOverQuestion = (index: number) => {
    setHover(`q${index}`);
  };
  const onMouseOutQuestion = () => {
    setHover("");
  };

  const onInputTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "CHANGE_TITLE", value: e.target.value });
  };

  const onInputDescription: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "CHANGE_DESCRIPTION", value: e.target.value });
  };

  const onInputQuestionTitle = (value: string, questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_TITLE", questionIndex, value });
  };

  const onClickSetQuestionType = (value: QuestionType, questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_TYPE", questionIndex, value });
  };

  const onClickAddQuestionChoice = (questionIndex: number) => {
    dispatch({ type: "ADD_QUESTION_CHOICE", questionIndex });
  };

  const onInputModifyQuestionChoice = (questionIndex: number, choiceIndex: number, value: string) => {
    dispatch({ type: "MODIFY_QUESTION_CHOICE", questionIndex, choiceIndex, value });
  };

  const onClickDeleteQuestionChoice = (questionIndex: number, choiceIndex: number) => {
    dispatch({ type: "DELETE_QUESTION_CHOICE", questionIndex, choiceIndex });
  };

  const onClickCopyQuestion = (questionIndex: number) => {
    dispatch({ type: "COPY_QUESTION", questionIndex });
  };

  const onClickAddQuestion = (questionIndex: number) => {
    dispatch({ type: "ADD_QUESTION", questionIndex });
  };

  const onClickDeleteQuestion = (questionIndex: number) => {
    const toastCallback = () => {
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
    };
    dispatch({ type: "DELETE_QUESTION", questionIndex, callback: toastCallback });
  };

  const onClickChangeQuestionEssential = (questionIndex: number) => {
    dispatch({ type: "CHANGE_QUESTION_ESSENTIAL", questionIndex });
  };

  const onClickSelectCategory = (value: string) => {
    dispatch({ type: "SELECT_FORM_CATEGORY", value });
  };

  const onClickChangeLoginRequired = () => {
    dispatch({ type: "CHANGE_LOGIN_REQUIRED" });
  };

  const onClickChangeOnBoardShare = () => {
    dispatch({ type: "CHANGE_ON_BOARD_SHARED" });
  };

  const onClickChangeAcceptResponse = () => {
    dispatch({ type: "CHANGE_ACCEPT_RESPONSE" });
  };

  const onClickChangeResponseModifiable = () => {
    dispatch({ type: "CHANGE_RESPONSE_MODIFIABLE" });
  };

  const onClickCopyLink = () => {
    window.navigator.clipboard.writeText(`${"127.0.0.1:3000"}/forms/${id}/view`);
    toast.success("링크가 복사되었습니다!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onClickSaveForm = () => {
    if (!id) return;
    if (!form.title) {
      toast.error("제목을 작성해주세요!", {
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
    if (!form.category) {
      toast.error("카테고리를 정해주세요!", {
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
    const apiData = fromFormToApi(state);
    formApi.saveForm(id as string, apiData);
    toast.success("저장이 완료되었습니다.!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onDragStart = (initial: DragStart) => {
    const { source } = initial;
    setDrag(`q${source.index}`);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    setDrag("");
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    dispatch({ type: "CHANGE_QUESTION_ORDER", destinationIndex: destination.index, originIndex: source.index });
    setFocus(`q${destination.index}`);
  };

  const showDragIndicator = (index: number) => {
    if (focus === `q${index}`) return true;
    if (drag === `q${index}`) return true;
    if (drag && drag !== hover) return false;
    if (hover === `q${index}`) return true;
    return false;
  };

  const checkApiSuccess = () => {
    if (!delayLoading && isSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (isLoading || delayLoading || isError) return true;
    return false;
  };

  return (
    <>
      {checkApiLoadingOrError() ? (
        <>
          <div className="mt-9 bg-white rounded p-5">
            <Skeleton.Element type="formTitle" />
            <Skeleton.Element type="text" />
            <Skeleton.Element type="text" />
          </div>
          {Array.from({ length: 2 }, (_, index) => index).map((value) => (
            <div
              className="mt-4 bg-white rounded border border-grey3 relative overflow-hidden pt-0 pb-5 px-5"
              key={value}
            >
              <Skeleton.Element type="formQuestionTitleEdit" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </div>
          ))}
          <div className="flex justify-end mt-4 mb-0 bg-white rounded p-5 relative overflow-hidden">
            <Skeleton.Element type="button" />
            <Skeleton.Shimmer />
          </div>
        </>
      ) : null}
      {checkApiSuccess() ? (
        <>
          <div className="mt-9 bg-white rounded p-5" onClick={() => onClickTitle()}>
            <input
              className="w-full block text-2xl py-1 px-0 border-b border-b-grey3 leading-9 focus:outline-none focus:border-b focus:border-b-black" // font-family: Arial, Helvetica, sans-serif
              onInput={onInputTitle}
              value={form.title}
              placeholder="제목을 작성해주세요"
            />
            <input
              className="w-full mt-2 mb-4 block text-base py-1 px-0 border-b border-grey3 leading-7 focus:outline-none focus:border-b focus:border-black" // font-family: Arial, Helvetica, sans-serif
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
                                    className="block w-3/5 text-base py-2 px-3 border-b border-b-grey3 bg-grey1 rounded focus:outline-none focus:border-b focus:border-b-black leading-7" //   font-family: Arial, Helvetica, sans-serif;
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

                                      if (isQuestionType(questionType))
                                        onClickSetQuestionType(questionType, questionIndex);
                                    }}
                                    items={QUESTION_TYPE_LIST}
                                    defaultValue="선택해주세요"
                                  />
                                </div>
                                <div className="py-2 px-0">
                                  <Question
                                    index={questionIndex}
                                    questionState={question[questionIndex]}
                                    addQuestionChoice={onClickAddQuestionChoice}
                                    modifyChoice={onInputModifyQuestionChoice}
                                    deleteChoice={onClickDeleteQuestionChoice}
                                  />
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
                                <QuestionRead questionState={question[questionIndex]} />
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
          <div className="flex justify-end mt-4 mb-8 mx-0 bg-white rounded p-5 relative overflow-hidden">
            <Button type="button" onClick={() => openModal()} className="bg-blue5 border bordery-grey3 text-white">
              저장
            </Button>
          </div>
        </>
      ) : null}
      <ModalPortal>
        <ShareFormModal
          formState={form}
          closeModal={closeModal}
          changeLoginRequired={onClickChangeLoginRequired}
          changeOnBoardShare={onClickChangeOnBoardShare}
          changeAcceptResponse={onClickChangeAcceptResponse}
          changeResponseModifiable={onClickChangeResponseModifiable}
          saveForm={onClickSaveForm}
          copyLink={onClickCopyLink}
        />
      </ModalPortal>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default Edit;
