import type { CSSProperties, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  outlined?: boolean
  className?: string
  style?: CSSProperties
  onClick: () => void
}

export default function Button({
  children,
  className,
  style,
  onClick,
  outlined,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const finalClassName = classNames(
    'bg-purple-200 border border-purple-200 p-3 text-purple-900 shadow-md rounded-full transition hover:bg-purple-300 cursor-pointer',
    {
      'bg-white': outlined,
      'border-2': outlined,
      'border-purple-900': outlined,
      'hover:border-purple-300': outlined
    },
    className
  )

  return (
    <button
      style={style}
      className={finalClassName}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
