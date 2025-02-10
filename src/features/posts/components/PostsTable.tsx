import { Post } from '@models/posts'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

export const PostsTable = (props: { posts: Post[] }) => {
  const columnHelper = createColumnHelper<Post>()

  // Define table columns
  const columns = [
    columnHelper.accessor('image', {
      header: () => 'Image',
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
    columnHelper.accessor('title', { header: () => 'Title' }),
    columnHelper.accessor('description', {
      header: () => 'Description',
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('date', { header: () => 'Date' }),
    columnHelper.accessor('viewCounter', { header: () => 'View Count' }),
    columnHelper.accessor('userId', { header: () => 'Author' }),
    columnHelper.accessor('status', { header: () => 'Status' }),
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
    <div>
      <table>
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
              <td colSpan={columns.length} className="text-center">
                No posts found within this date range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
