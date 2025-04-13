
import {
  Box,
  BoxProps, Paper,
  Skeleton,
  Stack,
  StackProps, Typography
} from '@mui/material'
import {
  OverridableComponent,
  OverrideProps,
} from '@mui/material/OverridableComponent'
import { ReactNode } from 'react'

const TEXT_WIDTH = 160
const TEXT_HEIGHT = 56
const BUTTON_WIDTH = 120
const BREAD_CRUMB_HEIGHT = 32
const AVATAR_SIZE = 40
const LINE_HEIGHT = 1.5

const PageLoadingHeader = () => {
  return (
    <Stack gap={0.5}>
      <Stack direction="row" gap={1} alignItems="center">
        <Skeleton width={TEXT_WIDTH} height={BREAD_CRUMB_HEIGHT} />
        <Skeleton width={TEXT_WIDTH} height={BREAD_CRUMB_HEIGHT} />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Skeleton variant="circular" width={AVATAR_SIZE} height={AVATAR_SIZE} />
        <Skeleton width={TEXT_WIDTH} height={TEXT_HEIGHT} />
      </Stack>
    </Stack>
  )
}

export const LoadingPage = (props: StackProps) => {
  return (
    <Stack gap={4} {...props}>
      <Stack direction="row" justifyContent="space-between" alignItems="end">
        <PageLoadingHeader />
        <Skeleton width={BUTTON_WIDTH} height={TEXT_HEIGHT} />
      </Stack>
      <Box>
        {[1, 2, 3].map((key) => (
          <Skeleton key={key} height={TEXT_HEIGHT} />
        ))}
      </Box>
    </Stack>
  )
}

type TitleProps = {
  title?: string | ReactNode
  topRightChildren?: ReactNode
}


const Title = ({
  title,
  topRightChildren,
}: TitleProps) => {
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        display={{ xs: 'none', sm: 'flex' }}
      >
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography
            lineHeight={LINE_HEIGHT}
            noWrap
            variant="h4"
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
    </>
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

  if (isLoading) return <LoadingPage />

  return (
    <Box
      component={Paper}
      elevation={0}
      display="flex"
      bgcolor="transparent"
      flexDirection="column"
      noValidate={noValidate}
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
