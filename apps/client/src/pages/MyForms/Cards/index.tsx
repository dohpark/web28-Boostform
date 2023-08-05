import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "@/components/common/Card";
import Notice from "@/components/common/Notice";
import Button from "@/components/common/Button";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { FormList } from "@/types/myForms";
import formApi from "@/api/formApi";
import { useMyForms } from "@/store/myForms";

interface CardsProps {
  openModal: () => void;
}

export default function Cards({ openModal }: CardsProps) {
  const router = useRouter();
  const { actions } = useMyForms();

  const fetchFormLists = (cursor: string): Promise<FormList> => formApi.getFormLists(cursor);
  const { data, isSuccess, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["myForm"],
    queryFn: ({ pageParam = "empty" }) => fetchFormLists(pageParam),
    getNextPageParam: (lastItem) => lastItem.lastId,
    retry: 2,
    suspense: true,
  });

  const onClickNavigateEditForm = (formId: string) => {
    router.push(`/forms/${formId}/edit`);
  };

  const onClickNavigateFormResult = (formId: string) => {
    router.push(`/forms/${formId}/result`);
  };

  const onClickOpenNameChangeModal = (id: string) => {
    actions.setModalType("change");
    actions.setSelectedFormId(id);
    openModal();
  };

  const onClickOpenDeleteFormModal = (id: string) => {
    actions.setModalType("delete");
    actions.setSelectedFormId(id);
    openModal();
  };

  const fetchNextPageAndUpdate = useCallback(async () => {
    await fetchNextPage();
    await refetch();
  }, [fetchNextPage, refetch]);

  const intersectionObserver = useRef<HTMLDivElement>(null);
  useIntersectionObserver(intersectionObserver, fetchNextPageAndUpdate);

  return (
    <div className="bg-white border-none rounded">
      {isSuccess && data.pages[0].form.length ? (
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
          {!hasNextPage ? (
            <Notice text="페이지의 끝입니다" className="text-blue3 bg-white border border-blue3" />
          ) : null}
        </>
      ) : null}
      <div ref={intersectionObserver} />
      {isSuccess && !data.pages[0].form.length ? (
        <Notice text="설문지가 존재하지 않습니다" className="text-blue3 bg-white border border-blue3" />
      ) : null}
    </div>
  );
}
