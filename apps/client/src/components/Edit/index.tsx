"use client";

import React from "react";
import { ToastContainer } from "react-toastify";

import useModal from "@/hooks/useModal";
import { FormDataApi } from "@/types/form";
import { fromApiToForm } from "@/utils/form";
import Head from "@/components/Edit/Head";
import Submit from "@/components/Edit/Submit";
import Body from "@/components/Edit/Body";
import ShareFormModal from "@/components/Edit/ShareFormModal";
import { createFormStore } from "@/store/edit";
import "react-toastify/dist/ReactToastify.min.css";
import { FormEditContext } from "@/contexts/formEditStoreProvider";

function Edit({ initialData }: { initialData: FormDataApi }) {
  const store = createFormStore(fromApiToForm(initialData, "edit"));

  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <FormEditContext.Provider value={store}>
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
    </FormEditContext.Provider>
  );
}

export default Edit;
