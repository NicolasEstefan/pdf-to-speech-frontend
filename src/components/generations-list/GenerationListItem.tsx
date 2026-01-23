import type { Generation, GenerationStatus } from '../../store/types/generation'
import { IconDownload, IconLoader2 } from '@tabler/icons-react'
import Button from '../common/Button'
import { refreshAuth } from '../../refresh-auth'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

interface GenerationListItemProps {
  generation: Generation
}

const statusColor: Record<GenerationStatus, { text: string; background: string }> = {
  'in-progress': {
    text: 'text-purple-900',
    background: 'bg-purple-200',
  },
  done: {
    text: 'text-green-900',
    background: 'bg-green-100',
  },
  failed: {
    text: 'text-red-900',
    background: 'bg-red-200',
  },
}

export default function GenerationListItem({ generation }: GenerationListItemProps) {
  const { t } = useTranslation()

  const handleDownload = async () => {
    await refreshAuth()

    window.open(
      `${import.meta.env.VITE_API_URL}/generations/${generation.id}/audio`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-300 p-4 shadow-md">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>{generation.title}</span>
          <span className="text-sm">{t(`speakers.${generation.speaker}`)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-fit rounded-full px-3 py-1 text-sm whitespace-nowrap shadow ${statusColor[generation.status].background} ${statusColor[generation.status].text}`}
          >
            {t(`generation-status.${generation.status}`)}{' '}
            {generation.status === 'in-progress'
              ? `${Math.floor(generation.progressPercentage)}%`
              : ''}
          </span>
          <span className="text-sm text-gray-500">{dayjs(generation.createdAt).fromNow()}</span>
        </div>
      </div>
      <Button className="relative h-fit p-4" disabled={!generation.audio} onClick={handleDownload}>
        {generation.status === 'in-progress' ? (
          <IconLoader2 className="animate-spin text-purple-900" />
        ) : (
          <IconDownload stroke={2} />
        )}
      </Button>
    </div>
  )
}
