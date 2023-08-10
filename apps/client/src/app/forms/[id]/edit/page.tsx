import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Loading from "./loading";

const Edit = dynamic(() => import("@/components/Edit"), { ssr: false, loading: () => <Loading /> });

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Edit />
    </Suspense>
  );
}
