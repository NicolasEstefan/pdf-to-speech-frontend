import type { Generation, GenerationStatus } from '../../store/types/generation'
import { IconDownload, IconLoader2 } from '@tabler/icons-react'
import Button from '../common/Button'
import { refreshAuth } from '../../refresh-auth'
import { useTranslation } from 'react-i18next'

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
    <div className="flex items-center justify-between gap-2 rounded-xl border border-gray-300 p-4 shadow-md">
      <div className="flex flex-col gap-1">
        <span>{generation.title}</span>
        <span
          className={`w-fit rounded-full px-3 py-1 text-sm shadow ${statusColor[generation.status].background} ${statusColor[generation.status].text}`}
        >
          {t(`generation-status.${generation.status}`)}{' '}
          {generation.status === 'in-progress'
            ? `${Math.floor(generation.progressPercentage)}%`
            : ''}
        </span>
      </div>
      <Button className="relative h-fit" disabled={!generation.audio} onClick={handleDownload}>
        {generation.status === 'in-progress' ? (
          <IconLoader2 className="animate-spin text-purple-900" />
        ) : (
          <IconDownload stroke={2} />
        )}
      </Button>
    </div>
  )
}
