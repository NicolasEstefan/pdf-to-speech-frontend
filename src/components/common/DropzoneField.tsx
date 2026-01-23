import { useDropzone } from 'react-dropzone'
import { IconUpload } from '@tabler/icons-react'
import { useState } from 'react'

export default function DropzoneField({
  value,
  onChange,
}: {
  value: File | null
  onChange: (file: File | null) => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: (files) => {
      onChange(files[0] ?? null)
    },
    onDragEnter: () => {
      setIsDragging(true)
    },
    onDragLeave: () => {
      setIsDragging(false)
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`${isDragging ? 'bg-purple-100' : ''} flex h-50 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-400 p-4 transition-all md:h-100`}
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
