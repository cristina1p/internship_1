import styles from '@components/Select.module.scss'
import { SelectHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

type LabeledSelectProps = {
  label: string
  options: { value: string; label: string }[]
  extraSelectProps?: () => SelectHTMLAttributes<HTMLSelectElement>
  error?: FieldError
} & SelectHTMLAttributes<HTMLSelectElement> // Extends native select props

export const Select = (props: LabeledSelectProps) => {
  const { error, options, label, extraSelectProps, ...restSelect } = props

  return (
    <div className={`${styles.selectGroup} ${error ? styles.hasError : ''}`}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>

      <select
        {...restSelect}
        {...extraSelectProps?.()}
        aria-invalid={props.error ? 'true' : 'false'}
        aria-describedby={`${props.id}-error`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${props.id}-error`} className={styles.errorMessage}>
          {error.message}
        </p>
      )}
    </div>
  )
}
