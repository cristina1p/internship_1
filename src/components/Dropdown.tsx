import { useState, useRef, useEffect } from 'react'

import styles from './Dropdown.module.scss'

interface DropdownOption {
  key: string
  label: string
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${styles.dropdown} ${className || ''}`} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {menuTrigger}
      </button>

      {isOpen && (
        <div
          id="dropdown-menu"
          className={`${styles.dropdownMenu} ${menuClassName || ''}`}
          role="menu"
        >
          {options.map(({ key, label }) => (
            <div
              key={key}
              className={styles.dropdownItem}
              role="menuitem"
              onClick={() => {
                onOptionClick(key)
                setIsOpen(false)
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
