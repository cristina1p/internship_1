import { UserDetailsContext } from '@components/contexts'
import { Footer, Header, MainContent, Sidebar } from '@components/layout'
import styles from '@components/layout/Layout.module.scss'
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
