import { LanguageSwitcher } from '@components/LanguageSwitcher'
import { TokenContext } from '@contexts/TokenContext'
import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import styles from '@layouts/Header.module.scss'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

interface HeaderProps {
  toggleSidebar: () => void
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { userDetails } = useContext(UserDetailsContext)

  const navigate = useNavigate()

  const handleHamburgerClick = () => {
    if (userDetails) {
      toggleSidebar()
    } else {
      navigate(paths.login)
    }
  }

  return (
    <header className={styles.header}>
      <button onClick={handleHamburgerClick}>
        <FaBars size={30} />
      </button>

      {/* Right Side */}
      <div className={styles.rightSide}>
        <LanguageSwitcher />

        <div className={styles.nav}>
          {userDetails ? <HeaderLoggedInArea /> : <HeaderLoggedOutArea />}
        </div>
      </div>
    </header>
  )
}

const HeaderLoggedInArea = () => {
  // State for toggling the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { userDetails } = useContext(UserDetailsContext)
  const { setToken } = useContext(TokenContext) // Acces token and setToken to clear it

  const { t } = useTranslation()

  const logout = () => setToken('')
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState)

  const { firstName, lastName, profileImage } = userDetails!

  return (
    <div className={styles.loggedIn}>
      <span>
        {firstName} {lastName}
      </span>

      <div className={styles.userDropdown}>
        <img
          src={profileImage}
          alt="Profile"
          className={styles.profileImage}
          onClick={toggleDropdown}
        />

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <span onClick={logout} className={styles.logoutOption}>
              {t('header.logout_button')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const HeaderLoggedOutArea = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Link to={paths.register}>
        <span className="button button--secondary">
          {t('header.signup_button')}
        </span>
      </Link>

      <Link to={paths.login}>
        <span className="button button--primary">
          {t('header.signin_button')}
        </span>
      </Link>
    </div>
  )
}
