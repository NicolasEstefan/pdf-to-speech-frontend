import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload } from '@tabler/icons-react'
import { Group, Text } from '@mantine/core'

export default function DropzoneField({
  value,
  onChange,
}: {
  value: File | null
  onChange: (file: File | null) => void
}) {
  return (
    <Dropzone
      onDrop={(files) => onChange(files[0] ?? null)}
      accept={PDF_MIME_TYPE}
      maxFiles={1}
      radius="lg"
    >
      <Group justify="center" align="center" h={150} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={40} color="var(--mantine-color-violet-6)" stroke={2} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconUpload size={40} color="var(--mantine-color-red-6)" stroke={2} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          {value ? (
            <Text>{value.name}</Text>
          ) : (
            <IconUpload size={40} color="var(--mantine-color-dimmed)" stroke={2} />
          )}
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  )
}
