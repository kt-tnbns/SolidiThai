import { useState } from 'react'
import {
  Button,
  Box,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FormTextField } from '../../components/form/FormTextField.react'
import { useLoginForm } from './useLoginForm'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { methods, onSubmit } = useLoginForm()

  const { control, handleSubmit } = methods

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <FormTextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        placeholder="Enter your email"
        required
        control={control}
      />

      <FormTextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        required
        control={control}
        placeholder="Enter your password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="primary"
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" underline="hover">
          Forgot password?
        </Link>
      </Box>
    </Box>
  )
}