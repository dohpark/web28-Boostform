import React, { Suspense } from "react";
import Loading from "./loading";
import Edit from "@/components/Edit";

async function getInitialData(id: string) {
  try {
    const res = await fetch(`http://172.17.0.1:8080/api/forms/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
  return;
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params: { id } }: PageProps) {
  const initialData = await getInitialData(id);

  return (
    <Suspense fallback={<Loading />}>
      <Edit initialData={initialData} />
    </Suspense>
  );
}
