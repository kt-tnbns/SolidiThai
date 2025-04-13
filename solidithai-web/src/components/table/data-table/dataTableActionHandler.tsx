import { ActionableItem } from '../../../types/dataTable'
import { IconButton } from '@mui/material'
import { FaPen, FaTrash } from "react-icons/fa6"

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
        color="primary"
      >
        <FaPen size={15} />
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
        <FaTrash size={15} />
      </IconButton>
    )

  return {
    getActionColumnSize,
    EditButton,
    DeleteButton,
  }
}
