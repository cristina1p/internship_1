import { Login } from '@auth/pages/Login'
import { Register } from '@auth/pages/Register'
import { AuthRequired } from '@components/AuthRequired'
import { UserDetailsContextProvider } from '@components/contexts/UserDetailsContextProvider'
import { LoggedOutRequired } from '@components/LoggedOutRequired'
import { NotFound } from '@components/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export function App() {
  return (
    <UserDetailsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />

          <Route element={<LoggedOutRequired />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthRequired />}>
            <Route path="/posts" element={<div>Posts Page</div>} />
            <Route path="/users" element={<div>Users Page</div>} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserDetailsContextProvider>
  )
}
