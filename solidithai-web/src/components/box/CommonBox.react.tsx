import {
  Box,
  BoxProps,
  Button, IconButton,
  Stack,
  Typography
} from '@mui/material'
import { Fragment, ReactNode, forwardRef } from 'react'
import { ModalBoxTemplate } from '../modal/ModalTemplate.react'

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
  isEditable?: boolean
  isDeletable?: boolean
  isShowCloseIcon?: boolean
  isManageable?: boolean
  disabledClickOutsideToClose?: boolean
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
      isEditable,
      isShowCloseIcon = true,
      isManageable = true,
      width,
      gap,
      gapChildren,
      disabledClickOutsideToClose,
      ...props
    },
    ref,
  ) => {
    const hasButton = cancelText || submitText
    return (
      <>
        {disabledClickOutsideToClose && (
          <Box width="100dvw" height="100dvh" position="absolute" />
        )}
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
                {isShowCloseIcon && (
                  <IconButton onClick={onClose}>
                    'X'
                  </IconButton>
                )}
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
                    sx={
                      isEditable === false
                        ? { display: 'none' }
                        : { display: 'flex' }
                    }
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
                          disabled={!isManageable}
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
      </>
    )
  },
)