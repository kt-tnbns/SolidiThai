import { Box, BoxProps } from '@mui/material'

type Props = { children?: React.ReactNode } & BoxProps

export const ModalBoxTemplate = ({
  children,
  width = { xs: 'auto', md: '80%', lg: '70%', xl: '60%', xxl: '50%' },
  gap = { xs: 2, sm: 4 },
  ...props
}: Props) => {
  return (
    <Box
      noValidate
      component="form"
      display="flex"
      position="relative"
      flexDirection="column"
      height={{ xs: '100vh', md: 'fit-content' }}
      borderRadius={4}
      my={{ md: 8 }}
      py={5}
      px={{ xs: 2, sm: 5 }}
      mx={{ md: 'auto' }}
      maxWidth={{ md: '768px' }}
      maxHeight={{
        xs: '80vh',
        md: 'fit-content',
      }}
      sx={{ overflowY: 'auto', backgroundColor: 'white' }}
      gap={gap}
      width={width}
      {...props}
    >
      {children}
    </Box>
  )
}
