import { Button, Stack } from "@mui/material"
import { User } from "../../../../types/auth"
import { useDeleteUserForm } from "./useDeleteUserForm"

type DeleteUserFormProps = {
  onClose: () => void
  refetch: () => void
  user: User
}

export const DeleteUserForm = ({ onClose, refetch, user }: DeleteUserFormProps) => {

  const { handleDeleteUser, isLoading } = useDeleteUserForm({ onClose, refetch, user })

  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleDeleteUser} disabled={isLoading}>
          Delete
        </Button>
      </Stack>
    </Stack>
  )

}