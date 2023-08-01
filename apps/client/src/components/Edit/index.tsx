"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import formApi from "@/api/formApi";
import useModal from "@/hooks/useModal";
import { FormDataApi } from "@/types/form";
import { fromApiToForm } from "@/utils/form";
import Head from "@/components/Edit/Head";
import Submit from "@/components/Edit/Submit";
import Body from "@/components/Edit/Body";
import ShareFormModal from "@/components/Edit/ShareFormModal";
import { useFormStore } from "@/store/edit";
import "react-toastify/dist/ReactToastify.min.css";

function Edit({ initialData }: { initialData: FormDataApi }) {
  const { id } = useParams();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id as string);
  const { data, isSuccess } = useQuery({
    queryKey: [id],
    queryFn: fetchForm,
    refetchOnWindowFocus: false,
    retry: 2,
    useErrorBoundary: true,
    suspense: true,
    initialData: initialData,
  });

  const { actions: formActions } = useFormStore();
  const { openModal, closeModal, ModalPortal } = useModal();

  useEffect(() => {
    if (!id) return;
    if (isSuccess) formActions.fetchData(fromApiToForm(data, "edit"));
  }, [data, id, isSuccess]);

  return (
    <>
      <Head />
      <Body />
      <Submit openModal={openModal} />
      <ModalPortal>
        <ShareFormModal closeModal={closeModal} />
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
