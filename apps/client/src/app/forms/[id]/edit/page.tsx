import React, { Suspense } from "react";
import Loading from "./loading";
import Edit from "@/components/Edit";

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Edit />
    </Suspense>
  );
}
