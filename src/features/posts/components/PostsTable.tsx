import { Post } from '@models/posts'
import { PaginationControls } from '@posts/components/PaginationControls'
import styles from '@posts/components/PostsTable.module.scss'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

export interface PostsTableProps {
  posts: Post[]
  total: number
  pagination: { pageIndex: number; pageSize: number }
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >
}

export const PostsTable = ({
  posts,
  pagination,
  setPagination,
  total,
}: PostsTableProps) => {
  const columnHelper = createColumnHelper<Post>()
  const { t } = useTranslation()

  // Define table columns
  const columns = [
    columnHelper.accessor('image', {
      header: () => t('table.image'),
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Post Image"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
      ),
    }),
    columnHelper.accessor('title', { header: () => t('table.title') }),
    columnHelper.accessor('description', {
      header: () => t('table.description'),
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('date', { header: () => t('table.date') }),
    columnHelper.accessor('viewCounter', {
      header: () => t('table.viewCount'),
    }),
    columnHelper.accessor('userId', { header: () => t('table.userId') }),
    columnHelper.accessor('status', { header: () => t('table.status') }),
  ]

  const table = useReactTable({
    data: posts,
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
                  <th key={header.id}>
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
                    <td key={cell.id}>
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
                <td colSpan={columns.length}>{t('table.noPosts')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls table={table} />
    </div>
  )
}
