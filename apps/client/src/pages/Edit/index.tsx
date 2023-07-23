"use client";

/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DropResult, DragStart } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";

import formApi from "@/api/formApi";

import ShareFormModal from "@/components/Modal/ShareFormModal";
import useModal from "@/hooks/useModal";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import writeReducer from "@/reducer/formEdit";
import { INITIAL_FORM } from "@/store/form";
import { FormDataApi, QuestionType } from "@/types/form";
import { fromApiToForm, fromFormToApi } from "@/utils/form";

import { useParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "@/components/Edit/Head";
import Submit from "@/components/Edit/Submit";
import Body from "@/components/Edit/Body";

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

  return (
    <>
      <Head />
      <Body />
      <Submit />
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
