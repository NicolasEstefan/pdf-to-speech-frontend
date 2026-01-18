import Skeleton from 'react-loading-skeleton'

interface GenerationListItemSkeletonProps {
  count?: number
}

export default function GenerationListItemSkeleton({ count = 1 }: GenerationListItemSkeletonProps) {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="flex justify-between rounded-xl border border-gray-300 p-4 shadow-md"
      >
        <div className="flex flex-col">
          <span>
            <Skeleton width={170} height={20} />
          </span>
          <span className="text-sm">
            <Skeleton width={100} height={10} />
          </span>
        </div>
        <Skeleton circle width={50} height={50} />
      </div>
    ))
}
