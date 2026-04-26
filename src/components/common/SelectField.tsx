import { NativeSelect } from '@mantine/core'
import type { NativeSelectProps } from '@mantine/core'

interface SelectFieldProps extends Omit<NativeSelectProps, 'data'> {
  options: {
    label: string
    value: string | number
  }[]
}

export function SelectField({ options, ...rest }: SelectFieldProps) {
  return (
    <NativeSelect {...rest}>
      {options.map((option) => (
        <option key={String(option.value)} value={option.value}>
          {option.label}
        </option>
      ))}
    </NativeSelect>
  )
}
