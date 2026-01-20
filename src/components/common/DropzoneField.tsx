import { useDropzone } from 'react-dropzone'
import { IconUpload } from '@tabler/icons-react'

export default function DropzoneField({
  value,
  onChange,
}: {
  value: File | null
  onChange: (file: File | null) => void
}) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (files) => {
      onChange(files[0] ?? null)
    },
    accept: {
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="flex h-50 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-400 p-4 shadow-md md:h-100"
    >
      <input {...getInputProps()} />
      {value ? (
        <p>{value.name}</p>
      ) : (
        <IconUpload className="text-gray-400" height={40} width={40} stroke={2} />
      )}
    </div>
  )
}
