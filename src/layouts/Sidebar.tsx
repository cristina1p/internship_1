import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { isDesktop } from '@helper/isDesktop'
import { paths } from '@helper/paths'
import styles from '@layouts/Sidebar.module.scss'
import { Role } from '@models/users'
import { useContext } from 'react'
import { FaHome, FaUser, FaFileAlt, FaCog } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface NavigationOptions {
  path: string
  label: string
  icon: JSX.Element
}

type RoleBasedRoutes = Record<Role, NavigationOptions[]>

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const baseRoutes: NavigationOptions[] = [
  { path: paths.dashboard, label: 'Dashboard', icon: <FaHome /> },
  { path: paths.posts, label: 'Posts', icon: <FaFileAlt /> },
  { path: paths.settings, label: 'Settings', icon: <FaCog /> },
]

const roleBasedRoutes: RoleBasedRoutes = {
  Admin: [
    ...baseRoutes,
    { path: paths.users, label: 'Users', icon: <FaUser /> },
  ],
  Moderator: baseRoutes,
  User: baseRoutes,
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const { userDetails } = useContext(UserDetailsContext)
  const { role } = userDetails!
  const routes = roleBasedRoutes[role]

  const handleClick = () => {
    if (!isDesktop()) {
      toggleSidebar()
    }
  }

  return (
    <>
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={toggleSidebar} />
      )}

      <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''} `}>
        <div>
          <div className={styles.logo}>{isSidebarOpen ? 'Logo' : 'L'}</div>

          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <Link to={route.path} onClick={handleClick}>
                  {route.icon}
                  {isSidebarOpen && (
                    <span className={styles.label}>{route.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
