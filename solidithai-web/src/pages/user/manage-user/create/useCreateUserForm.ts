import { useCreateUser } from "../../../../api/userApi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUser, createUserSchema } from "../../schema/userSchema"
import { toast } from "sonner"
import { useState } from "react"

type UseCreateUserFormProps = {
  onClose: () => void
  refetch: () => void
}

export const useCreateUserForm = ({ onClose, refetch }: UseCreateUserFormProps) => {
  const [revealPassword, setRevealPassword] = useState(false)
  const { mutateAsync: createUser, isPending: isLoading } = useCreateUser()

  const methods = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const handleCreateUser = async (user: CreateUser) => {
    await createUser(user, {
      onSuccess: () => {
        refetch()
        toast.success('User created successfully')
        methods.reset()
        onClose()
      },
      onError: (error: any) => {
        if (error.response?.data?.message === 'User already exists') {
          methods.setError('email', { message: 'This email is already in use' })
        } else {
          toast.error('Create user unsuccessfully')
        }
        
      },
    })
  }

  return {
    handleCreateUser,
    methods,
    isLoading,
    revealPassword,
    setRevealPassword,
  }
}