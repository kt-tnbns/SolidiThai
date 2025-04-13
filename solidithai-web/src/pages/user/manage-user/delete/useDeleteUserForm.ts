import { useDeleteUser } from "../../../../api/userApi"
import { User } from "../../../../types/auth"
import { toast } from "sonner"

type UseCreateUserFormProps = {
  onClose: () => void
  refetch: () => void
  user: User
}

export const useDeleteUserForm = ({ onClose, refetch, user }: UseCreateUserFormProps) => {
  
  const { mutateAsync: deleteUser, isPending: isLoading } = useDeleteUser(user.id)



  const handleDeleteUser = async () => {
    await deleteUser(user, {
      onSuccess: () => {
        refetch()
        toast.success('User deleted successfully')
        onClose()
      },
      onError: () => {
        toast.error('Create user unsuccessfully')
      },
    })
  }

  return {
    handleDeleteUser,
    isLoading,
  }
}