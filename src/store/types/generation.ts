import type { Audio } from './audio'

export type GenerationStatus = 'pending' | 'in-progress' | 'done' | 'failed'

export interface Generation {
  id: string
  title: string
  status: GenerationStatus
  audio: Audio
  createdAt: string
  updatedAt: string
}
