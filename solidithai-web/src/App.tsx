
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LoginPage } from "./pages/login/Login.react"
import Index from "./pages/Index.react"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthProvider.react"
import { UserPage } from "./pages/user/User.react"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
