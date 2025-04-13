import { Box, Paper, Typography } from '@mui/material'
import { LoginForm } from './LoginForm.react'

export const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        background: '#F1EFEC'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '90%',
          maxWidth: '400px',
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginBottom: 4,
            color: '#333',
            fontWeight: 600
          }}
        >
          Welcome to SolidiThai
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  )
}

