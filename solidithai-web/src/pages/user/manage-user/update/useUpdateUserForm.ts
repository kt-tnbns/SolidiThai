import { useGetUserById, useUpdateUser } from "../../../../api/userApi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateUser, updateUserSchema } from "../../schema/userSchema"
import { toast } from "sonner"
import { User } from "../../../../types/auth"
import { useEffect } from "react"

type UseCreateUserFormProps = {
  onClose: () => void
  refetch: () => void
  user: User
}

export const useUpdateUserForm = ({ onClose, refetch, user }: UseCreateUserFormProps) => {
  
  const { data: userData, isLoading: isUserLoading } = useGetUserById(user.id)
  
  const { mutateAsync: updateUser, isPending: isLoading } = useUpdateUser(user.id)

  const methods = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    },
  })

  const handleUpdateUser = async (user: UpdateUser) => {
    await updateUser(user, {
      onSuccess: () => {
        refetch()
        toast.success('User updated successfully')
        methods.reset()
        onClose()
      },
      onError: () => {
        toast.error('Create user unsuccessfully')
      },
    })
  }

  useEffect(() => {
    if (userData) {
      methods.reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      })
    }
  }, [userData])
  

  return {
    handleUpdateUser,
    methods,
    isLoading,
    userData,
    isUserLoading,
  }
}