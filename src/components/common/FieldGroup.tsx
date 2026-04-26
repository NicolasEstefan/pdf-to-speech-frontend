import { Stack, Text } from '@mantine/core'
import type { PropsWithChildren } from 'react'

interface FieldGroupProps extends PropsWithChildren {
  label: string
}

export default function FieldGroup({ children, label }: FieldGroupProps) {
  return (
    <Stack gap="xs">
      <Text fw={600}>{label}</Text>
      {children}
    </Stack>
  )
}
