interface SelectFieldProps {
  options: {
    label: string
    value: string | number
  }[]
}

export function SelectField({ options, ...rest }: SelectFieldProps) {
  return (
    <select {...rest} className="rounded-xl border border-gray-300 p-2 shadow-md outline-none">
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
