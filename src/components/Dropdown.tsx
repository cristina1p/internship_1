import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Dropdown.module.scss'

interface DropdownOption {
  key: string
  labelKey: string
}

interface DropdownProps {
  options: DropdownOption[]
  onOptionClick: (key: string) => void
  menuTrigger: JSX.Element | string
  className?: string
  menuClassName?: string
}

export const Dropdown = ({
  options,
  onOptionClick,
  menuTrigger,
  className,
  menuClassName,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const translatedMenuTrigger =
    typeof menuTrigger === 'string' ? t(menuTrigger) : menuTrigger

  return (
    <div className={`${styles.dropdown} ${className || ''}`} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {translatedMenuTrigger}
      </button>

      {isOpen && (
        <div
          id="dropdown-menu"
          className={`${styles.dropdownMenu} ${menuClassName || ''}`}
          role="menu"
        >
          {options.map(({ key, labelKey }) => (
            <div
              key={key}
              className={styles.dropdownItem}
              role="menuitem"
              onClick={() => {
                onOptionClick(key)
                setIsOpen(false)
              }}
            >
              {t(labelKey)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
