import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material'
import { useScreen } from '../../../hooks/useScreen'

type DataTableToolbarPropType = {
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  onChangeRowsPerPage?: (rowsPerPage: number) => void
  action?: React.ReactNode | React.ReactNode[]
}

const DataTableToolbar: React.FC<DataTableToolbarPropType> = (props) => {
  const theme = useTheme()
  const {
    rowsPerPage,
    onChangeRowsPerPage,
    rowsPerPageOptions,
    action,
  } = props

  const handleChanerowsPerPage = (
    event: SelectChangeEvent<number>,
  ) => {
    onChangeRowsPerPage?.(parseInt(event.target.value.toString(), 10))
  }

  const renderActions = () => {
    if (Array.isArray(action)) {
      return action.map((act, index) => <Box key={index}>{act}</Box>)
    }
    return <Box>{action}</Box>
  }

  const { isMobile } = useScreen()

  return (
    <Toolbar
      sx={{
        paddingBottom: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 3,
      }}
    >
      {rowsPerPageOptions && (
        <FormControl sx={{ minWidth: '10rem' }} fullWidth={isMobile}>
          <InputLabel id="per-page-options">Number of items</InputLabel>
          <Select<number>
            labelId="per-page-options-label"
            id="per-page-options-select"
            value={rowsPerPage}
            data-testid="per-page-options"
            label="Number of items"
            sx={{ height: 40 }}
            onChange={handleChanerowsPerPage}
          >
            {rowsPerPageOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {action && (
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          marginLeft="auto"
          width={isMobile ? '100%' : undefined}
        >
          {renderActions()}
        </Stack>
      )}
    </Toolbar>
  )
}

export default DataTableToolbar
