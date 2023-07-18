"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import boardApi from "@/api/forumApi";
import Layout from "@/components/template/BannerLayout";
import Button from "@/components/common/Button";
import TextDropdown from "@/components/common/Dropdown/TextDropdown";
import Card from "@/components/common/Card";
import Pagination from "@/components/common/Pagination";
import Notice from "@/components/common/Notice";
import Skeleton from "@/components/common/Skeleton";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import { CATEGORY_FORUM_LIST } from "@/store/form";
import { ForumCategory, OrderBy } from "@/types/forum";
import { ForumApi, SearchParams } from "./type";

function Forum() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initPage = Number(searchParams.get("page")) || 1;
  const initCategory = searchParams.get("category") || "";
  const initKeyword = searchParams.get("keyword") || "";
  const initOrderBy = searchParams.get("orderBy") || "";

  function isTypeOfCategory(categoryParam: string): categoryParam is ForumCategory {
    const Category = CATEGORY_FORUM_LIST as string[];
    return Category.includes(categoryParam);
  }
  function isTypeOfOrderBy(orderByParam: string): orderByParam is OrderBy {
    const ORDER_BY = ["latestAsc", "responseAsc", "responseDesc"];
    return ORDER_BY.includes(orderByParam);
  }

  const [inputSearch, setInputSearch] = useState(initKeyword);
  const [keyword, setKeyword] = useState(initKeyword);
  const [category, setCategory] = useState<ForumCategory>(isTypeOfCategory(initCategory) ? initCategory : "전체");
  const [orderBy, setOrderBy] = useState<OrderBy>(isTypeOfOrderBy(initOrderBy) ? initOrderBy : "latestAsc");
  const [page, setPage] = useState(Number(initPage));

  useEffect(() => {
    setInputSearch(initKeyword);
    setKeyword(initKeyword);
    setCategory(isTypeOfCategory(initCategory) ? initCategory : "전체");
    setOrderBy(isTypeOfOrderBy(initOrderBy) ? initOrderBy : "latestAsc");
    setPage(Number(initPage));
  }, [initCategory, initKeyword, initOrderBy, initPage]);

  const fetchFormList = (): Promise<ForumApi> => boardApi.getFormList({ title: keyword, category, orderBy, page });
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [keyword, category, orderBy, page],
    queryFn: fetchFormList,
    retry: 2,
    useErrorBoundary: true,
  });

  const loadingDelay = useLoadingDelay(isLoading);

  const checkApiLoadingOrError = () => isLoading || loadingDelay || isError;
  const createQueryString = ({ page, category, keyword, orderBy }: SearchParams) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("category", category);
    params.set("keyword", keyword);
    params.set("orderBy", orderBy);

    return params.toString();
  };

  const mutateSearchParams = (params: SearchParams) => {
    const queryString = createQueryString(params);
    router.push(`${pathname}?${queryString}`);
  };

  const onSubmitSearchKeyword: React.FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    mutateSearchParams({ page: 1, category, keyword: inputSearch, orderBy });
  };

  return (
    <Layout title="설문조사 게시판" description="다양한 설문조사를 만나보세요">
      <div className="min-w-[1024px] my-0 mx-8">
        <form className="mt-9 mb-2 flex" onSubmit={onSubmitSearchKeyword}>
          <input
            className="w-[calc(100%-60px)] h-9 py-0 px-2 border border-grey3 rounded-sm text-xs align-top"
            type="text"
            placeholder="검색어를 입력해주세요"
            onInput={(e) => setInputSearch(e.currentTarget.value)}
            value={inputSearch}
          />
          <Button type="submit" onSubmit={onSubmitSearchKeyword} className="text-xs bg-blue3 text-white ml-1">
            검색
          </Button>
        </form>
        <div className="w-full h-9 mb-2 flex justify-between items-center">
          <div className="flex">
            <label className="ml-6">
              <input
                className="hidden peer"
                type="radio"
                id="latestAsc"
                value="latestAsc"
                checked={orderBy === "latestAsc"}
                onChange={() => {
                  mutateSearchParams({ page: 1, category, keyword, orderBy: "latestAsc" });
                }}
              />
              <div className="text-xs text-grey8 cursor-pointer peer-checked:text-blue3 peer-checked:font-bold">
                최신순
              </div>
            </label>
            <label className="ml-6">
              <input
                className="hidden peer"
                type="radio"
                id="responseAsc"
                value="responseAsc"
                checked={orderBy === "responseAsc"}
                onChange={() => {
                  mutateSearchParams({ page, category, keyword, orderBy: "responseAsc" });
                }}
              />
              <div className="text-xs text-grey8 cursor-pointer peer-checked:text-blue3 peer-checked:font-bold">
                응답 높은순
              </div>
            </label>
            <label className="ml-6">
              <input
                className="hidden peer"
                type="radio"
                id="responseDesc"
                value="responseDesc"
                checked={orderBy === "responseDesc"}
                onChange={() => {
                  mutateSearchParams({ page: 1, category, keyword, orderBy: "responseDesc" });
                }}
              />
              <div className="text-xs text-grey8 cursor-pointer peer-checked:text-blue3 peer-checked:font-bold">
                응답 낮은순
              </div>
            </label>
          </div>
          <div className="flex items-center pt-2">
            <span className="text-xs mr-2 align-middle text-grey8">카테고리</span>
            <TextDropdown state={category} defaultState="카테고리를 선택해주세요" className="text-xs">
              <TextDropdown.Head className="border-none p-0 text-blue3 font-bold text-xs" />
              <TextDropdown.ItemList className="top-6 text-xs">
                {CATEGORY_FORUM_LIST.map((value) => (
                  <TextDropdown.Item
                    key={value}
                    value={value}
                    onClick={() => {
                      mutateSearchParams({ page: 1, category: value, keyword, orderBy });
                    }}
                  />
                ))}
              </TextDropdown.ItemList>
            </TextDropdown>
          </div>
        </div>
        {!loadingDelay && data?.form.length ? (
          <>
            <Card>
              {data?.form.map(({ formId, title, category: formCategory, responseCount }) => (
                <Card.Item key={formId} title={title}>
                  <div>
                    <Card.ItemText>카테고리: {formCategory || "미정"}</Card.ItemText>
                  </div>
                  <div>
                    <Card.ItemText>응답 수: {responseCount}</Card.ItemText>
                  </div>
                  <Card.ButtonWrapper>
                    <Button
                      type="button"
                      onClick={() => router.push(`/forms/${formId}/view`)}
                      className="bg-blue3 text-white mr-2 text-sm"
                    >
                      설문조사 참여하기
                    </Button>
                    <Button
                      type="button"
                      onClick={() => router.push(`/forms/${formId}/result`)}
                      className="border border-blue3 bg-white text-blue3 text-sm"
                    >
                      설문조사 결과보기
                    </Button>
                  </Card.ButtonWrapper>
                </Card.Item>
              ))}
            </Card>
            <Pagination
              currentPage={page}
              lastPage={Number(data?.lastPage)}
              callback={(pageNumber: number) => {
                mutateSearchParams({ page: pageNumber, category, keyword, orderBy: "responseDesc" });
              }}
            />
          </>
        ) : null}

        {checkApiLoadingOrError()
          ? Array.from({ length: 3 }, (_, index) => index).map((value) => (
              <Skeleton key={value}>
                <Skeleton.Element type="title" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </Skeleton>
            ))
          : null}
        {!loadingDelay && isSuccess && !data.form.length ? (
          <Notice text="설문지가 존재하지 않습니다" className="border border-blue3 text-blue3 text-sm" />
        ) : null}
      </div>
    </Layout>
  );
}

export default Forum;
