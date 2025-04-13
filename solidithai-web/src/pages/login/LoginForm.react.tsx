import { Stack, Button } from "@mui/material"
import { FormTextField } from "../../components/form/FormTextField.react"
import { useLoginForm } from "./useLoginForm"

export const LoginForm = () => {
  const { methods, loading, onSubmit } = useLoginForm()

  const { control, handleSubmit } = methods

  return (
    <Stack >
      <FormTextField
        control={control}
        name="email"
        placeholder="example@example.com"
      />
      <FormTextField
        control={control}
        name="password"
        type="password"
        placeholder="********"
      />
      <Button loading={loading} onClick={handleSubmit(onSubmit)}>
        {loading ? (
          'Signing in...'
        ) : (
          'Sign In'
        )}
      </Button>
    </Stack>
  )
}