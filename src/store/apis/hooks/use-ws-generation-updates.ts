import { useEffect } from 'react'
import dayjs from 'dayjs'
import { socket } from '../../../socket'
import type { GenerationStatus } from '../../types/generation'
import { generationsApi } from '../genereations-api'
import { useAppDispatch } from '../../hooks'

interface GenerationProgress {
  generationId: string
  generationStatus: GenerationStatus
  progressPercentage: number
  audioSize?: number
}

export const useWsGenerationUpdates = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.connect()

    socket.on('generation-progress', (progressReport: GenerationProgress) => {
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
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch])
}
