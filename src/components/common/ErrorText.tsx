import { Text } from '@mantine/core'
import type { PropsWithChildren } from 'react'

export default function ErrorText({ children }: PropsWithChildren) {
  return (
    <Text c="red.7" size="sm">
      {children}
    </Text>
  )
}
