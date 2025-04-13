import { Box, Divider, Stack, Typography } from '@mui/material'
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
    return '1fr'
  }

  return (
    <Stack p={3} gap={2} >
      <Typography variant="subtitle1">Search and filter users</Typography>
      <Box gap={2} display="grid" gridTemplateColumns={getResponsiveCol()}>
        <QueryTextField
          name="keyword"
          label="Search"
          variant="outlined"
          placeholder="By name or email"
          onBeforeSetSearchParams={setParams}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Divider />
      </Box>
    </Stack>
  )
}
