import React, { Suspense } from "react";
import Loading from "./loading";
import Edit from "@/pages/Edit";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Edit />
    </Suspense>
  );
}
