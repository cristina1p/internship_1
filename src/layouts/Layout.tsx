import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { Footer } from '@layouts/Footer'
import { Header } from '@layouts/Header'
import styles from '@layouts/Layout.module.scss'
import { MainContent } from '@layouts/MainContent'
import { Sidebar } from '@layouts/Sidebar'
import { PropsWithChildren, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { userDetails } = useContext(UserDetailsContext)

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState)

  return (
    <div className={`${styles.layout} ${userDetails ? styles.loggedIn : ''}`}>
      {userDetails && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <Header toggleSidebar={toggleSidebar} />
      <MainContent> {children || <Outlet />}</MainContent>
      <Footer />
    </div>
  )
}
