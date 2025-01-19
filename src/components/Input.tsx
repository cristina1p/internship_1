import styles from '@components/Input.module.scss'
import { InputHTMLAttributes } from 'react'

type InputProps = {
  label?: string
  error?: string
  extraInputProps?: () => InputHTMLAttributes<HTMLInputElement> // Bypasses issue with React.forwardRef()
} & InputHTMLAttributes<HTMLInputElement> // Extends native input props

export const Input = (props: InputProps) => {
  const { error, label, extraInputProps, ...restInput } = props

  return (
    <div className={`${styles.inputGroup} ${error ? styles.hasError : ''}`}>
      {label ? (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      ) : null}

      <input
        {...restInput}
        {...extraInputProps?.()}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={props.error ? 'true' : 'false'}
        aria-describedby={`${props.id}-error`}
      />

      {error && (
        <span id={`${props.id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  )
}
