import styles from '@components/Checkbox.module.scss'
import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

type LabeledCheckboxProps = {
  label: string
  error?: FieldError
  extraInputProps?: () => InputHTMLAttributes<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = (props: LabeledCheckboxProps) => {
  const { label, error, extraInputProps, ...restCheckbox } = props

  return (
    <div className={`${styles.checkboxGroup} ${error ? styles.hasError : ''}`}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          {...restCheckbox}
          {...extraInputProps?.()}
          className={styles.input}
          aria-invalid={props.error ? 'true' : 'false'}
          aria-describedby={`${props.id}-error`}
        />

        <label
          htmlFor={props.id}
          id={`${props.id}-label`}
          className={styles.label}
        >
          {label}
        </label>
      </div>

      {error && (
        <span id={`${props.id}-error`} className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  )
}
