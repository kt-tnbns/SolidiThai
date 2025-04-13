import { Box, Button, Skeleton, Stack } from "@mui/material"
import { FormTextField } from "../../../../components/form/FormTextField.react"
import { FormProvider } from "react-hook-form"
import { useUpdateUserForm } from "./useUpdateUserForm"
import { Fragment } from "react/jsx-runtime"
import { User } from "../../../../types/auth"

type UpdateUserFormProps = {
  onClose: () => void
  refetch: () => void
  user: User
}

export const UpdateUserForm = ({ onClose, refetch, user }: UpdateUserFormProps) => {

  const { methods, handleUpdateUser, isLoading, isUserLoading } = useUpdateUserForm({ onClose, refetch, user })

  const { handleSubmit } = methods
  return (
    isUserLoading ? Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} variant="rectangular" height={20} />
    )) :
      <Fragment>
        <Box p={2}>
          <Stack gap={3}>
            <FormProvider {...methods}>
              <FormTextField
                name="firstName"
                label="First Name"
                fullWidth
                placeholder="Enter first name"
                required
              />
              <FormTextField
                name="lastName"
                label="Last Name"
                fullWidth
                placeholder="Enter last name"
                required
              />
              <FormTextField
                name="email"
                label="Email"
                fullWidth
                placeholder="Enter email"
                required
              />
            </FormProvider>
          </Stack>
        </Box>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit(handleUpdateUser)} disabled={isLoading}>
            Update
          </Button>
        </Stack>
      </Fragment>
  )


}