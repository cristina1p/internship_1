import { Post } from '@models/posts'
import styles from '@posts/components/PostsTable.module.scss'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

export const PostsTable = (props: { posts: Post[] }) => {
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
    // columnHelper.accessor('userId', { header: () => t('table.userId') }),
    columnHelper.accessor('status', { header: () => t('table.status') }),
  ]

  const table = useReactTable({
    data: props.posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnIds, filterValue) => {
      return ['title', 'description'].some((columnId: string) =>
        row
          .getValue(columnId)
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase()),
      )
    },
  })

  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  )
}
