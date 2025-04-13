import { TextField, TextFieldProps } from '@mui/material'
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form'

export function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  onChange,
  regex,
  maxLength,
  removeSpacesOnBlur,
  trimSpaceOnBlur,
  isClearValueToUndefined = false,
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control'> &
  Omit<TextFieldProps, 'name'> & {
    regex?: RegExp
    removeSpacesOnBlur?: boolean
    trimSpaceOnBlur?: boolean
    maxLength?: number
    isClearValueToUndefined?: boolean
  }) {

  const maxLenErrorMessage = `Max length is ${maxLength}`

  const { field, fieldState } = useController({
    name,
    control,
  })

  const validateRegex = (value?: string): boolean => {
    return Boolean(regex && value && !regex.test(value))
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (maxLength) {
      if (e.target.value.length > maxLength) {
        control?.setError(name, {
          message: maxLenErrorMessage,
        })
      }
      if (
        fieldState.error?.message === maxLenErrorMessage &&
        e.target.value.length <= maxLength
      ) {
        control?.setError(name, {
          message: undefined,
        })
      }
    }

    if (isClearValueToUndefined && e.target.value === '') {
      field.onChange(undefined)
    } else {
      if (validateRegex(e.target.value)) return
      field.onChange(e)
    }
    onChange?.(e)
  }

  const handleOnBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (removeSpacesOnBlur) {
      field.onChange(e.target.value.replace(/\s/g, ''))
    }

    if (trimSpaceOnBlur) {
      field.onChange(e.target.value.trim())
    }

    field.onBlur()
  }

  return (
    <TextField
      inputRef={field.ref}
      value={field.value ?? ''}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      error={fieldState.invalid && Boolean(fieldState.error?.message)}
      helperText={fieldState.error?.message}
      disabled={field.disabled}
      name={field.name}
      InputLabelProps={{ shrink: true }}
      {...props}
    />
  )
}
