import { deleteUser } from '@api/users/deleteUser'
import { PaginationControls } from '@components/PaginationControls'
import { User } from '@models/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { UserActions } from '@users/components/UserActions'
import styles from '@users/components/UsersTable.module.scss'
import { t } from 'i18next'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { EditUserModal } from './EditUserModal'

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
  const queryClient = useQueryClient()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(t('table.deleteSuccess'))
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: Error) => {
      toast.error(t('table.deleteError', { error: error.message }))
    },
  })

  // Handle delete
  const handleDelete = (userId: string) => {
    if (window.confirm(t('table.confirmDelete'))) {
      deleteMutation.mutate(userId)
    }
  }

  const actions: Record<string, (userId: number) => void> = {
    edit: (userIndex) => {
      setSelectedUser(users[userIndex])
      setIsModalOpen(true)
    },
    delete: (userIndex) => {
      handleDelete(users[userIndex].id.toString())
    },
  }

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.firstName, {
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
    columnHelper.display({
      id: 'actions',
      header: () => t('table.actions'),
      cell: (info) => (
        <UserActions onOptionClick={(key) => actions[key]?.(info.row.index)} />
      ),
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

      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
