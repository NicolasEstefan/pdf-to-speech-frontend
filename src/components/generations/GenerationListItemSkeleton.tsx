import Skeleton from 'react-loading-skeleton'

export default function GenerationListItemSkeleton() {
  return (
    <div className="flex justify-between rounded-xl border border-gray-300 p-4 shadow-md">
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
  )
}
