import { TableRow, styled, TableCell, TableCellProps } from '@mui/material'

export const TableRowStyled = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
})

export const TableCellSpanStyled = styled('span')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const TableCellStyled = styled(TableCell)({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

type TableActionCellStyledProps = TableCellProps & {
  children?: React.ReactNode
}

export const TableActionCellStyled = ({
  children,
  sx,
  ...props
}: TableActionCellStyledProps) => {
  return (
    <TableCell
      sx={{
        minWidth: { xs: 20, lg: 110 },
        position: 'sticky',
        right: 0,
        background: 'white',
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}
