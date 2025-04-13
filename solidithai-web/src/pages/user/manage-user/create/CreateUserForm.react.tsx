import { Box, Button, IconButton, InputAdornment, Stack } from "@mui/material"
import { FormTextField } from "../../../../components/form/FormTextField.react"
import { FormProvider } from "react-hook-form"
import { useCreateUserForm } from "./useCreateUserForm"
import { Fragment } from "react/jsx-runtime"
import { FaEye, FaEyeSlash } from "react-icons/fa"

type CreateUserFormProps = {
  onClose: () => void
  refetch: () => void
}

export const CreateUserForm = ({ onClose, refetch }: CreateUserFormProps) => {

  const { methods, handleCreateUser, isLoading, revealPassword, setRevealPassword } = useCreateUserForm({ onClose, refetch })

  const { handleSubmit } = methods
  return (
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
            <FormTextField
              name="password"
              label="Password"
              fullWidth
              placeholder="Enter password"
              required
              type={revealPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setRevealPassword(!revealPassword)}>
                      {revealPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit(handleCreateUser)} disabled={isLoading}>
          Create
        </Button>
      </Stack>
    </Fragment>

  )

}