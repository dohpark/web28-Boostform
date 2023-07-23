"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import resultApi from "@/api/resultApi";
import FormLayout from "@/components/template/Layout";
import QuestionResult from "@/components/Result/QuestionResult";
import Skeleton from "@/components/common/Skeleton";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import { ResultApi, QuestionSummary } from "@/types/result";
import { useParams } from "next/navigation";

function Result() {
  const { id } = useParams();

  const fetchForm = (): Promise<ResultApi> => resultApi.getResult(id as string);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [id, "result"],
    queryFn: fetchForm,
    retry: 2,
    useErrorBoundary: true,
  });

  const [formResult, setFormResult] = useState<ResultApi>();
  const [questionResult, setQuestionResult] = useState<QuestionSummary[]>([]);
  const delayLoading = useLoadingDelay(isLoading);

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setFormResult(data);
      const results = Object.values(data.questionResultDict).map((value, index) => ({ ...value, key: index }));
      setQuestionResult(results);
    }
  }, [id, isSuccess, data]);

  const checkApiSuccess = () => {
    if (!delayLoading && isSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (isLoading || delayLoading || isError) return true;
    return false;
  };

  return (
    <FormLayout backgroundColor="blue">
      <div className="w-[760px]">
        {checkApiLoadingOrError() ? (
          <>
            <div className="mt-9 bg-white rounded py-3 px-5 relative overflow-hidden">
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Shimmer />
            </div>
            {Array.from({ length: 2 }, (_, index) => index).map((value) => (
              <div className="mt-4 bg-white rounded p-5 relative overflow-hidden last:mb-6" key={value}>
                <Skeleton.Element type="formQuestionTitle" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Element type="text" />
                <Skeleton.Shimmer />
              </div>
            ))}
          </>
        ) : null}
        {checkApiSuccess() ? (
          <>
            <div className="mt-9 bg-white rounded py-3 px-5 relative overflow-hidden">
              <div className="w-full block text-2xl py-1 px-0 border-none leading-[48px]">{formResult?.formTitle}</div>
              <div className="flex items-center">응답 {formResult?.totalResponseCount}개</div>
            </div>
            {questionResult.length ? (
              questionResult.map(({ type, questionTitle, responseCount, answerTotal, key }) => (
                <div className="mt-4 bg-white rounded p-5 relative overflow-hidden last:mb-6" key={key}>
                  <div>
                    <span>{questionTitle}</span>
                  </div>
                  {responseCount ? (
                    <div className="mt-2 mb-4 text-xs font-normal">
                      <span>응답 {responseCount}개</span>
                    </div>
                  ) : null}
                  {responseCount ? (
                    <QuestionResult type={type} answerTotal={answerTotal} />
                  ) : (
                    <div className="mt-5 text-sm font-normal">질문에 대한 응답이 없습니다.</div>
                  )}
                </div>
              ))
            ) : (
              <div className="mt-4 bg-white rounded p-5 relative overflow-hidden last:mb-6">
                <div className="text-sm font-normal">설문지에 대한 응답이 없습니다.</div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </FormLayout>
  );
}

export default Result;
