import { useAuth } from "../../context/AuthContext.react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdateUser, updateUserSchema } from "../user/schema/userSchema"
import { useUpdateUser } from "../../api/userApi"
import { toast } from "sonner"

export const useUserSettings = () => {
  const { user } = useAuth()

  const { mutate: updateUser, isPending } = useUpdateUser(user?.id || '')

  const onSubmit = async (data: UpdateUser) => {
    await updateUser(data, {
      onSuccess: () => {
        toast.success('User updated successfully')
      },
      onError: () => {
        toast.error('Failed to update user')
      },
    })
  }
  const methods = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  })

  return {
    methods,
    user,
    onSubmit,
    isPending,
  }
}