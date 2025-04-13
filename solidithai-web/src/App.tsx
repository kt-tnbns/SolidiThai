import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'

import { LoginPage } from "./pages/login/Login.react"
import { UserPage } from "./pages/user/UserPage.react"
import { UserSettingsPage } from "./pages/user-settings/UserSettings.react"
import Index from "./pages/Index.react"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthProvider.react"
import { NavBar } from "./components/nav/NavBar.react"
import { Box } from "@mui/material"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <NavBar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/user-settings" element={<UserSettingsPage />} />
              </Routes>
            </Box>
          </Box>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
