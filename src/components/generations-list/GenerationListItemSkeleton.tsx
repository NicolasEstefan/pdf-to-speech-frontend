import { Group, Paper, Skeleton, Stack } from '@mantine/core'

interface GenerationListItemSkeletonProps {
  count?: number
}

export default function GenerationListItemSkeleton({ count = 1 }: GenerationListItemSkeletonProps) {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <Paper key={index} radius="lg" withBorder shadow="sm" p="md">
        <Group justify="space-between">
          <Stack gap={6}>
            <Skeleton height={18} width={170} radius="sm" />
            <Skeleton height={12} width={100} radius="sm" />
          </Stack>
          <Skeleton circle height={42} width={42} />
        </Group>
      </Paper>
    ))
}
