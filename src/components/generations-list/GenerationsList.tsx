import { useEffect, useRef, type ReactNode } from 'react'
import { useGetGenerationsInfiniteQuery } from '../../store'
import { useUser } from '../../store/apis/hooks/use-user'
import GenerationListItem from './GenerationListItem'
import GenerationListItemSkeleton from './GenerationListItemSkeleton'
import { useWsGenerationUpdates } from '../../store/apis/hooks/use-ws-generation-updates'
import { useTranslation } from 'react-i18next'
import { Center, Paper, ScrollArea, Stack, Text } from '@mantine/core'

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
  let isEmpty = false

  if (isLoadingGenerations || isLoadingUser) {
    content = Array(5)
      .fill(0)
      .map((_, index) => <GenerationListItemSkeleton key={index} />)
  } else if (!user) {
    content = <Text c="dimmed">{t('sign-in-to-see-generations')}</Text>
    isEmpty = true
  } else if (!error && generationsResponse && (generationsResponse.pages[0]?.totalPages ?? 0) > 0) {
    content = generationsResponse
      .pages!.flatMap((page) => page.data)
      .map((generation) => <GenerationListItem key={generation.id} generation={generation} />)
  } else {
    content = <Text c="dimmed">{t('no-generations-yet')}</Text>
    isEmpty = true
  }

  return (
    <Paper h="100%" radius="xl" withBorder shadow="md" style={{ overflow: 'hidden' }}>
      {isEmpty ? (
        <Center h="100%">{content}</Center>
      ) : (
        <ScrollArea h="100%">
          <Stack gap="md" p="md">
            {content}
            {isFetchingNextPage && <GenerationListItemSkeleton count={3} />}
            <div ref={sentinelRef} />
          </Stack>
        </ScrollArea>
      )}
    </Paper>
  )
}
