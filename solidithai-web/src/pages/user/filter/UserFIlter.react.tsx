import { Box, Stack } from '@mui/material'
import { QueryTextField } from '../../../components/query/QueryTextfield.react'
import { useScreen } from '../../../hooks/useScreen'
import { useUserFilter } from './useUserFilter'

export const UserFilter = () => {
  const { setParams } = useUserFilter()

  const { isMobilePortrait, isMobileLandscape } = useScreen()

  const getResponsiveCol = () => {
    if (isMobilePortrait) {
      return '1fr'
    }

    if (isMobileLandscape) {
      return '1fr 1fr'
    }
    return '3fr 1fr'
  }

  return (
    <Stack px={3} p={3} gap={2} data-testid="curriculum-filter">
      <Box gap={2} display="grid" gridTemplateColumns={getResponsiveCol()}>
        <QueryTextField
          name="keyword"
          label="search"
          variant="outlined"
          placeholder="search"
          onBeforeSetSearchParams={setParams}
        />
      </Box>
    </Stack>
  )
}
