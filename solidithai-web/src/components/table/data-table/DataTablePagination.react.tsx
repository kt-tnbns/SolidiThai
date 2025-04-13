import {
  Pagination,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
} from '@mui/material'

type DataTablePaginationProps = StackProps & {
  totalCount: number
  currentPage: number
  rowsPerPage: number
  onPageChange: (newPage: number) => void
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  totalCount,
  currentPage,
  rowsPerPage,
  onPageChange,
  ...props
}) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage)
  const breakpointMD = useMediaQuery('(max-width: 600px)')

  const count = Math.max(totalPages, 1)
  const pageNumber = Math.min(currentPage, count)

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage)
    }
  }

  return (
    <Stack
      display="flex"
      direction="row"
      justifyContent="space-between"
      alignItems={{
        xs: 'start',
        lg: 'center',
      }}
      gap={breakpointMD ? 1 : 0}
      flexDirection={{
        lg: 'row',
      }}
      {...props}
    >
      <Typography variant="body1">
        {`From ${Math.min((currentPage - 1) * rowsPerPage + 1, totalCount)}
          to ${Math.min(rowsPerPage * currentPage, totalCount)}
          of ${totalCount}`}
      </Typography>
      <Pagination
        count={count}
        page={pageNumber}
        defaultPage={1}
        boundaryCount={breakpointMD ? 1 : 2}
        onChange={handlePageChange}
        color="primary"
        size={breakpointMD ? 'small' : 'large'}
        hidePrevButton={pageNumber === 1}
        showFirstButton={pageNumber > 1}
        showLastButton={pageNumber <= count}
      />
    </Stack>
  )
}

export default DataTablePagination
