import { useAuth } from "../../context/AuthContext.react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdateUser, updateUserSchema } from "../user/schema/userSchema"

export const useUserSettings = () => {
  const { user } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    handleSubmit,
  }
}