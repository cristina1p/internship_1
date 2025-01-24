import { Footer } from '@components/layout/Footer'
import { Header } from '@components/layout/Header'
import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children || <Outlet />}</main>
      <Footer />
    </>
  )
}
