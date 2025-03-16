import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { isDesktop } from '@helper/isDesktop'
import { paths } from '@helper/paths'
import styles from '@layouts/dashboard/Sidebar.module.scss'
import { Role } from '@models/users'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaHome, FaUser, FaFileAlt, FaCog } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

interface NavigationOptions {
  path: string
  labelKey: string
  icon: JSX.Element
  active?: string[]
}

type RoleBasedRoutes = Record<Role, NavigationOptions[]>

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const baseRoutes: NavigationOptions[] = [
  {
    path: paths.posts,
    labelKey: 'sidebar.posts',
    icon: <FaFileAlt size={20} />,
  },
  {
    path: paths.changeDetails,
    labelKey: 'sidebar.settings',
    icon: <FaCog size={20} />,
    active: [paths.changeDetails, paths.changePassword],
  },
]

const commonRoutes = [
  {
    path: paths.dashboard,
    labelKey: 'sidebar.dashboard',
    icon: <FaHome size={20} />,
  },
  ...baseRoutes,
]

const roleBasedRoutes: RoleBasedRoutes = {
  Admin: [
    ...commonRoutes,
    {
      path: paths.users,
      labelKey: 'sidebar.users',
      icon: <FaUser size={20} />,
    },
  ],
  Moderator: [...commonRoutes],
  User: baseRoutes,
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const { userDetails } = useContext(UserDetailsContext)
  const location = useLocation()
  const { t } = useTranslation()

  const routes = roleBasedRoutes[userDetails!.role]

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
        <div className={styles.logo}>{isSidebarOpen ? 'Logo' : 'L'}</div>
        <ul>
          {routes.map((route) => {
            const isActive = route.active
              ? route.active.includes(location.pathname)
              : location.pathname === route.path

            return (
              <li key={route.path} className={isActive ? styles.active : ''}>
                <Link to={route.path} onClick={handleClick}>
                  {route.icon}
                  {isSidebarOpen && (
                    <span className={styles.label}>{t(route.labelKey)}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
