
import { useMemo } from 'react'
import { ActionableItem } from '../../../types/dataTable'
import { useDataTableActionHandler } from './dataTableActionHandler'
import { TableActionCellStyled } from './DataTableStyled.react'
import { Stack } from '@mui/material'

type DataTableActionProps<T> = {
  item: T
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}

export const DataTableAction = <T extends ActionableItem>({
  item,
  onEdit,
  onDelete,
}: DataTableActionProps<T>) => {
  const { getActionColumnSize, EditButton, DeleteButton } =
    useDataTableActionHandler({
      item,
      onEdit,
      onDelete,
    })

  const hasAction = !!(onEdit || onDelete)

  const actionColumnSize = useMemo(getActionColumnSize, [
    hasAction,
    onEdit,
    onDelete,
    getActionColumnSize,
  ])

  return (
    <>
      {hasAction && (
        <TableActionCellStyled
          align="left"
          sx={{
            minWidth: { xs: 20, lg: actionColumnSize },
            width: actionColumnSize,
            maxWidth: actionColumnSize,
          }}
        >
          <Stack direction="row" px={1}>
            <EditButton />
            <DeleteButton />
          </Stack>
        </TableActionCellStyled>
      )}
    </>
  )
}
