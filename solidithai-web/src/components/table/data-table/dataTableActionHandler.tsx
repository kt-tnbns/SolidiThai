import { ActionableItem } from '../../../types/dataTable'
import { IconButton } from '@mui/material'

type DataTableActionHandlerProps<T> = {
  item: T
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
}

export const useDataTableActionHandler = <T extends ActionableItem>({
  item,
  onEdit,
  onDelete,
}: DataTableActionHandlerProps<T>) => {
  const hasAction = !!(onEdit || onDelete)

  const getActionColumnSize = () => {
    if (!hasAction) return 0
    const actionFns = [onEdit, onDelete].filter(
      (fn) => Boolean(fn),
    )
    return actionFns.length * 40
  }

  const EditButton = () =>
    onEdit && (
      <IconButton
        aria-label="edit"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(item)
        }}
        disabled={item.isDisableEdit}

      >
        Edit
      </IconButton>
    )

  const DeleteButton = () =>
    onDelete && (
      <IconButton
        aria-label="delete"
        onClick={() => onDelete(item)}
        color="error"
        disabled={item.isDisableDelete}
      >
        x
      </IconButton>
    )

  return {
    getActionColumnSize,
    EditButton,
    DeleteButton,
  }
}
