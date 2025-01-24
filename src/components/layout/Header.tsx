import { TokenContext } from '@components/contexts/TokenContext'
import { UserDetailsContext } from '@components/contexts/UserDetailsContext'
import { LanguageSwitcher } from '@components/LanguageSwitcher'
import styles from '@components/layout/Header.module.scss'
import { paths } from '@helper/paths'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Header = () => {
  const { t } = useTranslation()
  const { userDetails } = useContext(UserDetailsContext)
  const { setToken } = useContext(TokenContext) // Acces token and setToken to clear it

  // Logout function
  const logout = () => setToken('')
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section: Logo */}
        <div className={styles.logo}>
          <Link to="/">Logo</Link>
        </div>
        <div className={styles.headerActions}>
          <LanguageSwitcher />
          {/* Right Section: Conditional Rendering based on logged-in state */}
          <nav className={styles.nav}>
            {userDetails ? (
              // Loogged-in state: User profile and Logout button
              <div>
                <div className={styles.loggedInUserSection}>
                  <span>
                    {userDetails.firstName} {userDetails.lastName}
                  </span>
                  <img
                    src={userDetails.profileImage}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <button onClick={logout} className="button button--outlined">
                    {t('header.logout_button')}
                  </button>
                </div>
              </div>
            ) : (
              // Logged-out state: Sign In and Sign Up buttons
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
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
