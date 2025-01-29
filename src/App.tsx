import { Login } from '@auth/pages/Login'
import { Register } from '@auth/pages/Register'
import { AuthRequired } from '@components/AuthRequired'
import { AxiosInterceptors } from '@components/AxiosInterceptors'
import { LoggedOutRequired } from '@components/LoggedOutRequired'
import { NotFound } from '@components/NotFound'
import { TokenContextProvider } from '@contexts/TokenContextProvider'
import { UserDetailsContextProvider } from '@contexts/UserDetailsContextProvider'
import { paths } from '@helper/paths'
import { Layout } from '@layouts/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TokenContextProvider>
          <AxiosInterceptors />
          <UserDetailsContextProvider>
            <Routes>
              <Route element={<LoggedOutRequired />}>
                <Route path={paths.login} element={<Login />} />
                <Route path={paths.register} element={<Register />} />
              </Route>

              <Route element={<Layout />}>
                <Route element={<AuthRequired />}>
                  <Route path={paths.posts} element={<div>Posts Page</div>} />
                  <Route path={paths.users} element={<div>Users Page</div>} />
                  <Route
                    path={paths.dashboard}
                    element={<div>Dashboard Page</div>}
                  />
                  <Route
                    path={paths.settings}
                    element={<div>Settings Page</div>}
                  />
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
