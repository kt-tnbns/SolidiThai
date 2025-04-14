import { Box, Divider, Stack, Typography } from '@mui/material'
import { QueryTextField } from '../../../components/query/QueryTextfield.react'
import { useUserFilter } from './useUserFilter'

export const UserFilter = () => {
  const { setParams } = useUserFilter()

  return (
    <Stack p={3} gap={2} >
      <Typography variant="subtitle1">Search and filter users</Typography>
      <Box gap={2} display="grid" gridTemplateColumns="1fr">
        <QueryTextField
          fullWidth
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
      </Box>
      <Divider />
    </Stack>
  )
}
