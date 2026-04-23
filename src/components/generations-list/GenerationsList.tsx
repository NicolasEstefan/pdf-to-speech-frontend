import { useEffect, useRef, type ReactNode } from 'react'
import { useGetGenerationsInfiniteQuery } from '../../store'
import { useUser } from '../../store/apis/hooks/use-user'
import GenerationListItem from './GenerationListItem'
import GenerationListItemSkeleton from './GenerationListItemSkeleton'
import { useWsGenerationUpdates } from '../../store/apis/hooks/use-ws-generation-updates'
import { useTranslation } from 'react-i18next'

export default function GenerationsList() {
  const { t } = useTranslation()
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { user, isLoading: isLoadingUser } = useUser()
  const {
    isFetchingNextPage,
    hasNextPage,
    isLoading: isLoadingGenerations,
    data: generationsResponse,
    error,
    fetchNextPage,
  } = useGetGenerationsInfiniteQuery(undefined, { skip: !user })

  useWsGenerationUpdates()

  useEffect(() => {
    if (!sentinelRef.current || !user || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [isFetchingNextPage, user, hasNextPage, fetchNextPage])

  let content: ReactNode | ReactNode[]

  if (isLoadingGenerations || isLoadingUser) {
    content = Array(5)
      .fill(0)
      .map((_, index) => <GenerationListItemSkeleton key={index} />)
  } else if (!user) {
    content = (
      <div className="flex h-full w-full items-center justify-center text-center text-gray-400">
        {t('sign-in-to-see-generations')}
      </div>
    )
  } else if (!error && generationsResponse && (generationsResponse.pages[0]?.totalPages ?? 0) > 0) {
    content = generationsResponse
      .pages!.flatMap((page) => page.data)
      .map((generation) => <GenerationListItem key={generation.id} generation={generation} />)
  } else {
    content = (
      <div className="flex h-full w-full items-center justify-center text-center text-gray-400">
        {t('no-generations-yet')}
      </div>
    )
  }

  return (
    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-3xl border border-gray-300 bg-white p-4 shadow-md">
      {content}
      {isFetchingNextPage && <GenerationListItemSkeleton count={3} />}
      <div ref={sentinelRef}></div>
    </div>
  )
}
