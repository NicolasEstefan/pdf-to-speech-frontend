import type { PropsWithChildren } from 'react'

export default function ErrorText({ children }: PropsWithChildren) {
  return <span className="text-red-700">{children}</span>
}
