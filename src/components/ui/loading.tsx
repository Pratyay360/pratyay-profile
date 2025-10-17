import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LoadingProps {
  count?: number;
  height?: number;
  className?: string;
}

export function Loading({ count = 1, height = 40, className }: LoadingProps) {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className={`p-10 mt-10 ${className}`}>
        <Skeleton count={count} height={height} />
      </div>
    </SkeletonTheme>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-10 mt-10 text-center text-red-500" role="alert">
      <p>{message}</p>
    </div>
  );
}