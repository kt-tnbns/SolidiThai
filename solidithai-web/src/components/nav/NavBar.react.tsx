import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Stack, Divider, Box } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.react'
import { FaUser } from 'react-icons/fa6'

export const NavBar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    navigate('/login')
  }

  const handleSettings = () => {
    navigate('/user-settings')
    handleClose()
  }

  return (
    user && (
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                SolidiThai User Management
              </Typography>
            </Link>
          </Box>

          <Stack direction="row" gap={2} pr={4}>
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </Link>
            <Link to="/user-settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                Settings
              </Typography>
            </Link>
          </Stack>

          {user ? (
            <Stack direction="row" gap={2}>
              <IconButton
                size="small"
                onClick={handleMenu}
                color="inherit"
              >
                <FaUser />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    sx: {
                      px: 2,
                    },
                  },
                }}
              >
                <Stack gap={1} p={2}>
                  <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                    {user.email}
                  </Typography>
                </Stack>
                <Divider />
                <Stack gap={1} py={2}>
                  <MenuItem onClick={handleSettings} sx={{ color: 'primary.main' }}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                </Stack>
              </Menu>
            </Stack>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  )
} 