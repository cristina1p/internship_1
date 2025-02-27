import styles from '@components/PaginationControls.module.scss'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PaginationControlsProps<TData> {
  table: Table<TData>
}

export const PaginationControls = <TData,>({
  table,
}: PaginationControlsProps<TData>) => {
  const { t } = useTranslation()
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const [pageInput, setPageInput] = useState(currentPage.toString())

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = Number(pageInput)
    if (page >= 1 && page <= totalPages) {
      table.setPageIndex(page - 1) // React Table is zero-based
    }
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.topRow}>
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>

        <span className={styles.pageInfo}>
          {t('pagination.page')} {currentPage} {t('pagination.of')} {totalPages}
        </span>

        {/* Vertical line */}
        <div className={styles.verticalLine}></div>
      </div>

      <div className={styles.bottomRow}>
        {/* Go to Page */}
        <form onSubmit={handlePageSubmit} className={styles.pageForm}>
          <span className={styles.goToText}>{t('pagination.goTo')}</span>
          <input
            type="number"
            value={pageInput}
            onChange={handlePageInputChange}
            min={1}
            max={totalPages}
            className={styles.pageInput}
          />
          <button type="submit" disabled={pageInput === currentPage.toString()}>
            {t('pagination.go')}
          </button>
        </form>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
