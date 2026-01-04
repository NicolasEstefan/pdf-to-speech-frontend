import type { CSSProperties, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  outlined?: boolean
  className?: string
  style?: CSSProperties
  disabled?: boolean
  onClick: () => void
}

export default function Button({
  children,
  className,
  style,
  onClick,
  outlined,
  disabled = false,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const finalClassName = classNames(
    'bg-purple-200 border border-purple-200 p-3 text-purple-900 shadow-md rounded-full transition hover:bg-purple-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed',
    {
      'bg-white border-2 border-purple-900 hover:border-purple-300 disabled:border-none':
        outlined
    },
    className
  )

  return (
    <button
      disabled={disabled}
      style={style}
      className={finalClassName}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
