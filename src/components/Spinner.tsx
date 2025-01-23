import styles from '@components/Spinner.module.scss'

export const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  )
}
