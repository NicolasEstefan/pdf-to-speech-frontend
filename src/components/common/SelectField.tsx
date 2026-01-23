import classNames from 'classnames'

interface SelectFieldProps {
  options: {
    label: string
    value: string | number
  }[]
  className?: string
}

export function SelectField({ options, className, ...rest }: SelectFieldProps) {
  const finalClassName = classNames(
    'rounded-xl border border-gray-300 p-3 shadow-md outline-none',
    className
  )

  return (
    <select {...rest} className={finalClassName}>
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
