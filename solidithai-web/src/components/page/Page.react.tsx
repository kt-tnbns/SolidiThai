
import {
  Box,
  BoxProps, Paper, Stack, Typography
} from '@mui/material'
import {
  OverridableComponent,
  OverrideProps,
} from '@mui/material/OverridableComponent'
import { Fragment, ReactNode } from 'react'

const LINE_HEIGHT = 1

type TitleProps = {
  title?: string | ReactNode
  topRightChildren?: ReactNode
}

const Title = ({
  title,
  topRightChildren,
}: TitleProps) => {
  return (
    <Fragment>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        display={{ xs: 'none', sm: 'flex' }}
      >
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography
            lineHeight={LINE_HEIGHT}
            noWrap
            variant="h5"
          >
            {title}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
          position="relative"
        >
          <Box
            sx={{
              display: 'flex',
              zIndex: 4,
              marginRight: '16px',
              gap: 2,
              alignItems: 'anchor-center',
            }}
          >
            {topRightChildren}
          </Box>
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        display={{ xs: 'flex', sm: 'none' }}
      >
        <Box maxWidth={'64%'}>

          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
          >
            {topRightChildren}

          </Stack>
        </Box>
      </Stack>
    </Fragment>
  )
}

type PageProps = {
  titleBg?: string
  subTitle?: string
  children?: ReactNode
  isLoading?: boolean
  noValidate?: boolean
  childrenComponent?: OverridableComponent<any>
  childrenBorder?: OverrideProps<any, any>
  childrenBgColor?: OverrideProps<any, any>
  pxChild?: number
} & TitleProps

export default function Page({
  title,
  subTitle,
  children,
  topRightChildren,
  isLoading,
  noValidate,
  childrenComponent = Paper,
  childrenBorder,
  childrenBgColor,
  pxChild,
  ...props
}: BoxProps & PageProps) {

  return (
    <Box
      component={Paper}
      display="flex"
      bgcolor="transparent"
      flexDirection="column"
      noValidate={noValidate}
      p={4}
      pb={6}
      {...props}
    >
      <Title
        title={title}
        topRightChildren={topRightChildren}
      />
      <Box sx={{ wordBreak: 'break-all' }}>
        {subTitle && (
          <Typography mt={1} variant="body2">
            {subTitle}
          </Typography>
        )}
      </Box>

      {children && (
        <Box px={pxChild ?? 3}>
          <Box
            component={childrenComponent}
            border={childrenBorder}
            variant="outlined"
            bgcolor={childrenBgColor}
          >
            {children}
          </Box>
        </Box>
      )}
    </Box>
  )
}
