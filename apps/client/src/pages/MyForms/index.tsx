"use client";

import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import formApi from "@/api/formApi";
import BannerLayout from "@/components/template/BannerLayout";
import EditNameModal from "@/components/Modal/EditFormNameModal";
import DeleteSurveyModal from "@/components/Modal/DeleteFormModal";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Notice from "@/components/common/Notice";
import Skeleton from "@/components/common/Skeleton";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import useModal from "@/hooks/useModal";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { FormList } from "@/types/myForms";
import Plus from "@public/icons/plus.svg";

function MyForms() {
  const [modalType, setModalType] = useState("delete");
  const [selectedFormId, setSelectedFormId] = useState("");

  const router = useRouter();
  const { openModal, closeModal, ModalPortal } = useModal();

  const fetchFormLists = (cursor: string): Promise<FormList> => formApi.getFormLists(cursor);
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, refetch, isError } = useInfiniteQuery({
    queryKey: ["myForm"],
    queryFn: ({ pageParam = "empty" }) => fetchFormLists(pageParam),
    getNextPageParam: (lastItem) => lastItem.lastId,
    retry: 2,
    useErrorBoundary: true,
  });

  const loadingDelay = useLoadingDelay(isLoading);

  const refetchData = () => refetch();

  const fetchNextPageAndUpdate = useCallback(async () => {
    await fetchNextPage();
    await refetch();
  }, [fetchNextPage, refetch]);

  const intersectionObserver = useRef<HTMLDivElement>(null);
  useIntersectionObserver(intersectionObserver, fetchNextPageAndUpdate);

  const onClickCreateForm = async () => {
    const { formId } = await formApi.createForm();
    router.push(`/forms/${formId}/edit`);
  };

  const onClickNavigateEditForm = (formId: string) => {
    router.push(`/forms/${formId}/edit`);
  };

  const onClickNavigateFormResult = (formId: string) => {
    router.push(`/forms/${formId}/result`);
  };

  const onClickOpenNameChangeModal = (id: string) => {
    setModalType("change");
    setSelectedFormId(id);
    openModal();
  };

  const onClickOpenDeleteFormModal = (id: string) => {
    setModalType("delete");
    setSelectedFormId(id);
    openModal();
  };

  const checkApiLoadingOrError = () => {
    if (isLoading || loadingDelay || isError) return true;
    return false;
  };

  return (
    <BannerLayout title="내 설문조사" description="내가 만든 설문조사 확인하기">
      <section className="min-w-[1024px] my-0 mx-8">
        <div className="mt-6 mb-4">
          <Button type="button" onClick={onClickCreateForm} className="bg-blue3 text-white text-base">
            <Plus height="24" width="24" fill="white" />
            <span className="ml-1">새 설문지</span>
          </Button>
        </div>

        <div className="bg-white border-none rounded">
          {!loadingDelay && isSuccess && data.pages[0].form.length ? (
            <>
              <Card>
                {data.pages.map((page) =>
                  page.form.map(({ category, _id, onBoard, response, title, updatedAt, acceptResponse }) => (
                    <Card.Item title={title} key={_id}>
                      <div className="grid grid-cols-3 grid-rows-2 grid-rows-[repeat(2, minmax(0, 20px))]">
                        <div>
                          <Card.ItemText>카테고리: {category || "미정"}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>응답수: {response}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>수정일: {updatedAt}</Card.ItemText>
                        </div>
                        <div>
                          <Card.ItemText>게시판 공유: </Card.ItemText>
                          <span className="text-sm">{onBoard ? "💡" : "🔒"}</span>
                        </div>
                        <div>
                          <Card.ItemText>응답받기: </Card.ItemText>
                          <span className="text-sm">{acceptResponse ? "💡" : "🔒"}</span>
                        </div>
                      </div>
                      <Card.ButtonWrapper>
                        <Button
                          type="button"
                          onClick={() => onClickNavigateEditForm(_id)}
                          className="bg-blue3 text-white mr-2 text-sm"
                        >
                          설문조사 수정하기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickNavigateFormResult(_id)}
                          className="bg-white text-blue3 mr-2 border border-blue3 text-sm"
                        >
                          설문조사 결과보기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickOpenNameChangeModal(_id)}
                          className="bg-blue3 text-white mr-2 text-sm"
                        >
                          제목 수정하기
                        </Button>
                        <Button
                          type="button"
                          onClick={() => onClickOpenDeleteFormModal(_id)}
                          className="bg-white text-red1 border border-red1 text-sm"
                        >
                          삭제하기
                        </Button>
                      </Card.ButtonWrapper>
                    </Card.Item>
                  ))
                )}
              </Card>
              {!hasNextPage && !isLoading ? (
                <Notice text="페이지의 끝입니다" className="text-blue3 bg-white border border-blue3" />
              ) : null}
            </>
          ) : null}
          <div ref={intersectionObserver} />
          {!loadingDelay && isSuccess && !data.pages[0].form.length ? (
            <Notice text="설문지가 존재하지 않습니다" className="text-blue3 bg-white border border-blue3" />
          ) : null}
          {checkApiLoadingOrError()
            ? Array.from({ length: 3 }, (_, index) => index).map((value) => (
                <Skeleton key={value} className="px-5 py-3 mt-10">
                  <Skeleton.Element type="title" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Element type="text" />
                  <Skeleton.Shimmer />
                </Skeleton>
              ))
            : null}
        </div>
      </section>

      {modalType === "change" ? (
        <ModalPortal>
          <EditNameModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
        </ModalPortal>
      ) : null}
      {modalType === "delete" ? (
        <ModalPortal>
          <DeleteSurveyModal closeModal={closeModal} selectedFormId={selectedFormId} refetchData={refetchData} />
        </ModalPortal>
      ) : null}
    </BannerLayout>
  );
}

export default MyForms;
