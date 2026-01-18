import type { PropsWithChildren } from 'react'

interface FieldGroupProps extends PropsWithChildren {
  label: string
}

export default function FieldGroup({ children, label }: FieldGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  )
}
