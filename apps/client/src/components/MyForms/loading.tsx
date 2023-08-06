import Skeleton from "@/components/common/Skeleton";

export default function CardsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => index).map((value) => (
        <Skeleton key={value} className="px-5 py-3 mt-10">
          <Skeleton.Element type="title" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Element type="text" />
          <Skeleton.Shimmer />
        </Skeleton>
      ))}
    </>
  );
}
