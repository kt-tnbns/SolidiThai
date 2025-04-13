import { debounce, TextField, TextFieldProps } from '@mui/material'
import { useState, useEffect, useCallback, forwardRef } from 'react'

export type TextFieldDebounceProps = TextFieldProps & {
  delay?: number
}

export const TextFieldDebounce: React.FC<TextFieldDebounceProps> = forwardRef(
  ({ onChange, value, delay = 500, ...props }, ref) => {
    const [debouncedValue, setDebouncedValue] = useState<string>('')

    useEffect(() => {
      setDebouncedValue(value as unknown as string)
    }, [value])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleOnChange = useCallback(
      debounce((e) => {
        onChange?.(e)
      }, delay),
      [onChange, delay],
    )

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedValue(e.target.value)
      handleOnChange(e)
    }

    return (
      <TextField
        onChange={handleValueChange}
        value={debouncedValue}
        ref={ref}
        {...props}
      />
    )
  },
)
