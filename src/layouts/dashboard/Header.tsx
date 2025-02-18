import { Dropdown } from '@components/Dropdown'
import { LanguageSwitcher } from '@components/LanguageSwitcher'
import { TokenContext } from '@contexts/TokenContext'
import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import styles from '@layouts/dashboard/Header.module.scss'
import { useContext, useRef } from 'react'
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
      toggleSidebar() // Only call if toggleSidebar is passed
    } else {
      navigate(paths.login)
    }
  }

  return (
    <header className={styles.header}>
      <button onClick={handleHamburgerClick}>
        <FaBars size={16} />
      </button>

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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { userDetails } = useContext(UserDetailsContext)
  const { setToken } = useContext(TokenContext) // Acces token and setToken to clear it

  const { t } = useTranslation()

  const { firstName, lastName, profileImage } = userDetails!
  const userDropdownOptions = [
    { key: 'logout', label: t('header.logout_button') },
  ]

  const actions: Record<string, () => void> = {
    logout: () => setToken(''),
  }

  return (
    <div className={styles.loggedIn} ref={dropdownRef}>
      <span>
        {firstName} {lastName}
      </span>

      <Dropdown
        className={styles.userDropdown}
        menuClassName={styles.dropdownMenu}
        options={userDropdownOptions}
        onOptionClick={(key) => actions[key]?.()}
        menuTrigger={
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
        }
      />
    </div>
  )
}

const HeaderLoggedOutArea = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.loggedOut}>
      <Link to={paths.register}>
        <span className="buttonSecondary">{t('header.signup_button')}</span>
      </Link>

      <Link to={paths.login}>
        <span className="buttonPrimary">{t('header.signin_button')}</span>
      </Link>
    </div>
  )
}
