import {
  BoxProps,
  Button, IconButton,
  Stack, Typography
} from '@mui/material'
import { Fragment, ReactNode, forwardRef } from 'react'
import { ModalBoxTemplate } from '../modal/ModalTemplate.react'
import { FaX } from 'react-icons/fa6'

interface CommonBoxFormProps extends BoxProps {
  title: string
  description?: string
  submitText?: string
  cancelText?: string
  children: ReactNode
  loading?: boolean
  onSubmit?: (e?: React.FormEvent) => void
  onClose: () => void
  onDelete?: () => void
  onCancel?: () => void
  gapChildren?: number
}

export const CommonBoxForm = forwardRef<HTMLDivElement, CommonBoxFormProps>(
  (
    {
      title,
      description,
      children,
      cancelText,
      submitText,
      loading,
      onClose,
      onSubmit,
      onDelete,
      onCancel,
      width,
      gap,
      gapChildren,
      ...props
    },
    ref,
  ) => {
    const hasButton = cancelText || submitText
    return (
      <Fragment>
        <ModalBoxTemplate gap={gap} width={width} ref={ref} {...props}>
          {loading ? (
            'Loading...'
          ) : (
            <Fragment>
              <Stack
                component="header"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack gap={1} width="90%">
                  <Typography variant="h5">{title}</Typography>
                  {description && (
                    <Typography
                      variant="body2"
                      sx={{
                        'overflow-wrap': 'break-word',
                      }}
                    >
                      {description}
                    </Typography>
                  )}
                </Stack>
                <IconButton onClick={onClose} sx={{ color: 'error.main' }}>
                  <FaX />
                </IconButton>
              </Stack>
              <Stack
                gap={gapChildren || { xs: 4, sm: 5 }}
                pt={1}
                sx={{ overflowY: 'auto' }}
              >
                {children}
                {hasButton && (
                  <Stack
                    component="footer"
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    justifyContent={onDelete ? 'space-between' : 'end'}
                    gap={2}
                  >
                    <Stack
                      direction={{ xs: 'column-reverse', sm: 'row' }}
                      justifyContent="end"
                      width="100%"
                      gap={2}
                      pb={1}
                    >
                      {cancelText && (
                        <Button
                          size="large"
                          variant="outlined"
                          onClick={onCancel ?? onClose}
                          sx={{ minWidth: 'fit-content' }}
                        >
                          {cancelText}
                        </Button>
                      )}
                      {submitText && (
                        <Button
                          size="large"
                          variant="contained"
                          type="submit"
                          onClick={onSubmit}
                        >
                          {submitText}
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Fragment>
          )}
        </ModalBoxTemplate>
      </Fragment>
    )
  },
)