import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
const Edit = dynamic(() => import("@/components/Edit"), { ssr: false, loading: () => <Loading /> });

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Edit />
    </Suspense>
  );
}
