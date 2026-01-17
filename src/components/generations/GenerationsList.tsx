import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useGetGenerationsQuery } from '../../store'
import { useUser } from '../../store/apis/hooks/use-user'
import GenerationListItem from './GenerationListItem'
import GenerationListItemSkeleton from './GenerationListItemSkeleton'

export default function GenerationsList() {
  const [page, setPage] = useState(1)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { user, isLoading: isLoadingUser } = useUser()
  const {
    isFetching,
    isLoading: isLoadingGenerations,
    data: generationsResponse,
    error,
  } = useGetGenerationsQuery(
    {
      page,
      pageSize: 10,
    },
    { skip: !user }
  )

  useEffect(() => {
    if (!sentinelRef.current || !user || page === generationsResponse?.totalPages) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching) {
        setPage((previous) => previous + 1)
      }
    })

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [isFetching, generationsResponse?.totalPages, user])

  let content: ReactNode | ReactNode[]

  if (isLoadingGenerations || isLoadingUser) {
    content = Array(5)
      .fill(0)
      .map((_, index) => <GenerationListItemSkeleton key={index} />)
  } else if (!error && generationsResponse) {
    content = generationsResponse!.data.map((generation) => (
      <GenerationListItem key={generation.id} generation={generation} />
    ))
  } else if (!user) {
    content = (
      <div className="flex h-full w-full items-center justify-center text-center text-gray-400">
        Inicia sesión para ver tus generaciones
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-3xl border border-gray-300 bg-white p-4 shadow-md">
      {content}
      <div ref={sentinelRef}></div>
    </div>
  )
}
