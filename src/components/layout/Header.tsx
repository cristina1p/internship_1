import { TokenContext, UserDetailsContext } from '@components/contexts'
import { LanguageSwitcher } from '@components/LanguageSwitcher'
import styles from '@components/layout/Header.module.scss'
import { paths } from '@helper/paths'
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

function HeaderLoggedInArea() {
  // State for toggling the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { userDetails } = useContext(UserDetailsContext)
  const { setToken } = useContext(TokenContext) // Acces token and setToken to clear it

  const { t } = useTranslation()

  const logout = () => setToken('')
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

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

function HeaderLoggedOutArea() {
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
