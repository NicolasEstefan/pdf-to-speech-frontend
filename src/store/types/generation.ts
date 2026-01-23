import type { Audio } from './audio'

export type GenerationStatus = 'in-progress' | 'done' | 'failed'

export interface Generation {
  id: string
  title: string
  status: GenerationStatus
  audio: Audio
  language: string
  speaker: string
  progressPercentage: number
  createdAt: string
  updatedAt: string
}
