import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import {
  TextFieldDebounce,
  TextFieldDebounceProps,
} from './TextFieldDebounce.react'

export const QueryTextField: React.FC<
  Omit<TextFieldDebounceProps, 'value'> & {
    name: string
    resetSearchParamOnClose?: boolean
    onBeforeSetSearchParams?: (searchParams: URLSearchParams) => void
  }
> = ({
  onChange,
  name,
  resetSearchParamOnClose = false,
  onBeforeSetSearchParams,
  ...props
}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get(name) ?? ''
    const onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        searchParams.set(name, event.target.value)
      } else {
        searchParams.delete(name)
      }
      onBeforeSetSearchParams?.(searchParams)
      setSearchParams(searchParams, {
        replace: true,
      })
    }

    useEffect(() => {
      return () => {
        if (resetSearchParamOnClose) {
          searchParams.delete(name)
          setSearchParams(searchParams)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <TextFieldDebounce
        type="search"
        name={name}
        value={query}
        onChange={(e) => {
          onChangeQuery(e as React.ChangeEvent<HTMLInputElement>)
          onChange?.(e)
        }}
        {...props}
      />
    )
  }
