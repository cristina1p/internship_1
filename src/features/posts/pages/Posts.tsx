import { getPosts } from '@api/hooks/posts'
import { Dropdown } from '@components/Dropdown'
import { PostsTable } from '@posts/components/PostsTable'
import styles from '@posts/pages/Posts.module.scss'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const statusOptions = [
  { label: 'All Statuses', key: '' },
  { label: 'Published', key: 'Published' },
  { label: 'Draft', key: 'Draft' },
  { label: 'Deleted', key: 'Deleted' },
]

export const Posts = () => {
  const [status, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [start, setStartDateFilter] = useState('')
  const [end, setEndDateFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'posts',
      {
        status: status,
        start,
        end: end,
        search: debouncedSearch,
        page: pagination.pageIndex,
        limit: pagination.pageSize, // Number of posts per page
      },
    ],
    queryFn: getPosts,
  })

  if (error) return <span>Error loading posts</span>

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.pageTitle}>Posts</h1>
      <div className={styles.filtersContainer}>
        <div className={styles.filterLeft}>
          <input
            type="text"
            placeholder="Search by Title or Description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filtersRight}>
          <input
            type="date"
            value={start}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
          <input
            type="date"
            value={end}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
          <Dropdown
            options={statusOptions}
            onOptionClick={setStatusFilter}
            menuTrigger={<span>{status || 'Select Status'}</span>}
            className={styles.dropdown}
          />
        </div>
      </div>

      {!isLoading && (
        <PostsTable
          posts={data?.posts || []}
          total={data?.total || 0}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  )
}
