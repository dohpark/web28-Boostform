import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="mt-9 bg-white rounded p-5">
        <Skeleton.Element type="formTitle" />
        <Skeleton.Element type="text" />
        <Skeleton.Element type="text" />
      </div>
      {Array.from({ length: 2 }, (_, index) => index).map((value) => (
        <div className="mt-4 bg-white rounded border border-grey3 relative overflow-hidden pt-0 pb-5 px-5" key={value}>
          <Skeleton.Element type="formQuestionTitleEdit" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Shimmer />
        </div>
      ))}
      <div className="flex justify-end mt-4 mb-0 bg-white rounded p-5 relative overflow-hidden">
        <Skeleton.Element type="button" />
        <Skeleton.Shimmer />
      </div>
    </>
  );
}
