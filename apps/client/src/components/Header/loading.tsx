import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="overflow-hidden border border-grey1 rounded">
      <Skeleton.Element type="loginButton" />
    </div>
  );
}
