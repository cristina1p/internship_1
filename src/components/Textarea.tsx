import styles from '@components/Textarea.module.scss'
import { TextareaHTMLAttributes } from 'react'

type TextareaProps = {
  label?: string
  error?: string
  extraTextareaProps?: () => TextareaHTMLAttributes<HTMLTextAreaElement>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = (props: TextareaProps) => {
  const { error, label, extraTextareaProps, ...restTextarea } = props

  return (
    <div className={`${styles.textareaGroup} ${error ? styles.hasError : ''}`}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}

      <textarea
        {...restTextarea}
        {...extraTextareaProps?.()}
        className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
        aria-invalid={error ? 'true' : 'false'}
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
