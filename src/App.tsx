import { AxiosInterceptors } from '@api/hooks'
import { Login } from '@auth/pages/Login'
import { Register } from '@auth/pages/Register'
import { NotFound } from '@components/NotFound'
import { TokenContextProvider } from '@contexts/TokenContextProvider'
import { UserDetailsContextProvider } from '@contexts/UserDetailsContextProvider'
import { AdminRoleRequired } from '@guards/AdminRoleRequired'
import { AuthRequired } from '@guards/AuthRequired'
import { LoggedOutRequired } from '@guards/LoggedOutRequired'
import { paths } from '@helper/paths'
import { AuthLayout } from '@layouts/auth'
import { Layout } from '@layouts/dashboard'
import { CreatePost } from '@posts/components'
import { Posts } from '@posts/pages/Posts'
import { Settings } from '@settings/pages'
import { SettingsChangeDetails } from '@settings/pages/SettingsChangeDetails'
import { SettingsChangePassword } from '@settings/pages/SettingsChangePassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AddUser } from '@users/components'
import { Users } from '@users/pages/Users'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TokenContextProvider>
          <AxiosInterceptors />
          <UserDetailsContextProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route
                path={paths.home}
                element={<Navigate to={paths.login} replace />}
              />

              <Route element={<LoggedOutRequired />}>
                <Route element={<AuthLayout />}>
                  <Route path={paths.login} element={<Login />} />
                  <Route path={paths.register} element={<Register />} />
                </Route>
              </Route>

              <Route element={<AuthRequired />}>
                <Route element={<Layout />}>
                  <Route path={paths.posts} element={<Posts />} />
                  <Route path={paths.createPost} element={<CreatePost />} />

                  <Route element={<AdminRoleRequired />}>
                    <Route path={paths.users} element={<Users />} />
                    <Route path={paths.addUser} element={<AddUser />} />
                  </Route>

                  <Route
                    path={paths.dashboard}
                    element={<div>Dashboard Page</div>}
                  />
                  <Route path={paths.settings} element={<Settings />}>
                    <Route
                      index
                      element={<Navigate to="/settings/details" replace />}
                    />
                    <Route
                      path={paths.changeDetails}
                      element={<SettingsChangeDetails />}
                    />
                    <Route
                      path={paths.changePassword}
                      element={<SettingsChangePassword />}
                    />
                  </Route>
                </Route>

                <Route path={paths.notFound} element={<NotFound />} />
              </Route>
            </Routes>
          </UserDetailsContextProvider>
        </TokenContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
