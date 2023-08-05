"use client";

import React, { Suspense } from "react";
import BannerLayout from "@/components/template/BannerLayout";
import useModal from "@/hooks/useModal";
import Modal from "./Modal";
import CreateForm from "./CreateForm";
import CardsSkeleton from "./loading";
import Cards from "./Cards";

function MyForms() {
  const { openModal, ModalPortal, closeModal } = useModal();

  return (
    <BannerLayout title="내 설문조사" description="내가 만든 설문조사 확인하기">
      <section className="min-w-[1024px] my-0 mx-8">
        <CreateForm />
        <Suspense fallback={<CardsSkeleton />}>
          <Cards openModal={openModal} />
        </Suspense>
      </section>
      <ModalPortal>
        <Modal closeModal={closeModal} />
      </ModalPortal>
    </BannerLayout>
  );
}

export default MyForms;
