import { PaginationControls } from '@components/PaginationControls'
import { User } from '@models/users'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import styles from '@users/components/UsersTable.module.scss'
import { t } from 'i18next'

export interface UsersTableProps {
  users: User[]
  total: number
  pagination: { pageIndex: number; pageSize: number }
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >
}

export const UsersTable = ({
  users,
  pagination,
  setPagination,
  total,
}: UsersTableProps) => {
  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'firstName',
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'lastName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor('email', {
      header: 'Email',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      footer: (info) => info.column.id,
    }),
  ]

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // Enables server-side pagination
    pageCount: Math.ceil(total / pagination.pageSize), // Calculate total pages from API
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    globalFilterFn: (row, _columnIds, filterValue) => {
      return ['title', 'description'].some((columnId) =>
        row
          .getValue(columnId)
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase()),
      )
    },
  })

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles[header.column.id]}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles[cell.column.id]}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>{t('table.noUsers')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > pagination.pageSize && <PaginationControls table={table} />}
    </div>
  )
}
