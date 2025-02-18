"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import formApi from "@/api/formApi";
import Skeleton from "@/components/common/Skeleton";
import FormLayout from "@/components/template/Layout";
import useLoadingDelay from "@/hooks/useLoadingDelay";
import { FormDataApi } from "@/types/form";
import { useResponseHistory } from "@/store/responseHistory";

type ParamsProps = {
  id: string;
};

function Result() {
  const { id } = useParams() as ParamsProps;
  const { responseId, type, actions } = useResponseHistory();

  const [localResponseId] = useState(responseId);
  const [localType] = useState(type);

  useEffect(() => {
    actions.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const fetchForm = (): Promise<FormDataApi> => formApi.getForm(id as string);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [id, "form"],
    queryFn: fetchForm,
    retry: 2,
    useErrorBoundary: true,
  });

  const delayLoading = useLoadingDelay(isLoading);
  const [form, setForm] = useState<FormDataApi>();

  useEffect(() => {
    if (!id) return;
    if (isSuccess) {
      setForm(data);
    }
  }, [isSuccess, data, id]);

  const onClickModifyPreviousResponse = () => {
    actions.setResponseId(localResponseId);
    actions.setType("editResponse");
    router.push(`/forms/${id}/view`);
  };

  const onClickNavigateOtherResponse = () => {
    router.push(`/forms/${id}/view`);
  };

  const getTitle = () => {
    if (localType === "submitResponse") return "응답이 기록되었습니다.";
    if (localType === "duplicateResponse") return "이미 응답했습니다.";
    if (localType === "endResponse") return "더 이상 응답을 받지 않습니다.";
    return "noTitle";
  };

  const checkApiSuccess = () => {
    if (!delayLoading && isSuccess) return true;
    return false;
  };
  const checkApiLoadingOrError = () => {
    if (isLoading || delayLoading) return true;
    return false;
  };

  return (
    <FormLayout backgroundColor="blue">
      <div className="w-[760px]">
        <div className="mt-9 bg-white rounded pt-2 px-5 pb-7">
          {checkApiLoadingOrError() ? (
            <>
              <Skeleton.Element type="formTitle" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
              <Skeleton.Element type="text" />
            </>
          ) : null}
          {checkApiSuccess() ? (
            <>
              <div className="w-full block text-3xl py-1 border-none leading-[48px]">{form?.title}</div>
              <p className="pt-2 text-sm font-normal">{getTitle()}</p>
              {form?.acceptResponse ? (
                <div className="mt-6 flex flex-col">
                  {form?.responseModifiable ? (
                    <Link
                      className="pt-1 text-sm font-normal text-blue4 underline cursor-pointer"
                      href={`/forms/${id}/view`}
                      onClick={onClickModifyPreviousResponse}
                    >
                      응답 수정
                    </Link>
                  ) : null}
                  {!form?.loginRequired ? (
                    <Link
                      className="pt-1 text-sm font-normal text-blue4 underline cursor-pointer"
                      href={`/forms/${id}/view`}
                      onClick={onClickNavigateOtherResponse}
                    >
                      다른 응답 제출
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </FormLayout>
  );
}

export default Result;
