import type { Generation } from '../../store/types/generation'
import { IconDownload } from '@tabler/icons-react'
import Button from '../common/Button'
import { refreshAuth } from '../../refresh-auth'

interface GenerationListItemProps {
  generation: Generation
}

export default function GenerationListItem({ generation }: GenerationListItemProps) {
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
      <div className="flex flex-col">
        <span>{generation.title}</span>
        <span className="text-sm">{generation.status}</span>
      </div>
      <Button className="h-fit" disabled={!generation.audio} onClick={handleDownload}>
        <IconDownload stroke={2} />
      </Button>
    </div>
  )
}
