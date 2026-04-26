import type { Generation, GenerationStatus } from '../../store/types/generation'
import { IconDownload } from '@tabler/icons-react'
import { refreshAuth } from '../../refresh-auth'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { ActionIcon, Badge, Group, Loader, Paper, Stack, Text, Tooltip } from '@mantine/core'

interface GenerationListItemProps {
  generation: Generation
}

const statusColor: Record<GenerationStatus, string> = {
  'in-progress': 'violet',
  done: 'green',
  failed: 'red',
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
    <Paper radius="lg" withBorder shadow="sm" p="md">
      <Group justify="space-between" gap="md" wrap="nowrap">
        <Stack gap="sm" style={{ flex: 1, minWidth: 0 }}>
          <Stack gap={4}>
            <Tooltip label={generation.title} openDelay={400}>
              <Text truncate>{generation.title}</Text>
            </Tooltip>
            <Text size="sm" c="dimmed">
              {t(`speakers.${generation.speaker}`)}
            </Text>
          </Stack>
          <Group gap="xs">
            <Badge color={statusColor[generation.status]} variant="light" radius="xl">
              {t(`generation-status.${generation.status}`)}{' '}
              {generation.status === 'in-progress'
                ? `${Math.floor(generation.progressPercentage)}%`
                : ''}
            </Badge>
            <Text size="sm" c="dimmed">
              {dayjs(generation.createdAt).fromNow()}
            </Text>
          </Group>
        </Stack>
        <ActionIcon size="xl" radius="xl" disabled={!generation.audio} onClick={handleDownload}>
          {generation.status === 'in-progress' ? <Loader size="sm" /> : <IconDownload stroke={2} />}
        </ActionIcon>
      </Group>
    </Paper>
  )
}
