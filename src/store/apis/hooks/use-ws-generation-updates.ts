import { useEffect } from 'react'
import dayjs from 'dayjs'
import { socket } from '../../../socket'
import type { GenerationStatus } from '../../types/generation'
import { generationsApi } from '../genereations-api'
import { useAppDispatch } from '../../hooks'
import { useUser } from './use-user'

interface GenerationProgress {
  generationId: string
  generationStatus: GenerationStatus
  progressPercentage: number
  audioSize?: number
}

interface GenerationError {
  generationId: string
}

export const useWsGenerationUpdates = () => {
  const dispatch = useAppDispatch()
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      return
    }

    socket.connect()

    const onGenerationProgress = (progressReport: GenerationProgress) => {
      dispatch(
        generationsApi.util.updateQueryData('getGenerations', undefined, (draft) => {
          const generation = draft.pages
            .flatMap((page) => page.data)
            .find((generation) => generation.id === progressReport.generationId)

          if (!generation) {
            return
          }

          generation.progressPercentage = progressReport.progressPercentage
          generation.status = progressReport.generationStatus
          if (generation.status === 'done' && progressReport.audioSize) {
            generation.audio = {
              size: progressReport.audioSize,
              id: generation.id,
              createdAt: dayjs().toISOString(),
              updatedAt: dayjs().toISOString(),
            }
          }
        })
      )
    }

    const onGenerationError = (errorReport: GenerationError) => {
      dispatch(
        generationsApi.util.updateQueryData('getGenerations', undefined, (draft) => {
          const generation = draft.pages
            .flatMap((page) => page.data)
            .find((generation) => generation.id === errorReport.generationId)

          if (!generation) {
            return
          }

          generation.status = 'failed'
        })
      )
    }

    socket.on('generation-progress', onGenerationProgress)
    socket.on('generation-error', onGenerationError)

    return () => {
      socket.off('generation-progress', onGenerationProgress)
      socket.off('generation-error', onGenerationError)
      socket.disconnect()
    }
  }, [dispatch, user])
}
