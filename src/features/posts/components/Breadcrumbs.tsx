import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './Breadcrumbs.module.scss'

type BreadcrumbsItems = {
  path?: string
  labelKey: string
}

type BreadcrumbProps = {
  items: BreadcrumbsItems[]
}

export const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  const { t } = useTranslation()
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          {item.path ? (
            <Link to={item.path} className={styles.breadcrumbLink}>
              {t(item.labelKey)}
            </Link>
          ) : (
            <span className={styles.breadcrumbLabel}>{t(item.labelKey)}</span>
          )}
          {index < items.length - 1 && (
            <span className={styles.breadcrumbSeparator}> / </span>
          )}
        </span>
      ))}
    </nav>
  )
}
