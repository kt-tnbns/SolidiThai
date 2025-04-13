import { Box, Button, Stack } from '@mui/material'
import Page from '../../components/page/Page.react'
import { FormTextField } from '../../components/form/FormTextField.react'
import { FormProvider } from 'react-hook-form'
import { useUserSettings } from './useUserSettings'

export const UserSettingsPage = () => {

  const { methods, onSubmit, isPending } = useUserSettings()
  const { control, handleSubmit: handleSubmitForm } = methods
  return (
    <Page
      title="User Settings"
      gap={2}
    >
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <FormProvider {...methods}>

          <Stack spacing={3} >
            <FormTextField
              name="firstName"
              label="First Name"
              fullWidth
              control={control}
            />
            <FormTextField
              name="lastName"
              label="Last Name"
              fullWidth
              control={control}
            />
            <FormTextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              control={control}
            />
            <Button onClick={handleSubmitForm(onSubmit)} variant="contained" disabled={isPending}>
              Save Changes
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </Page>
  )
} 