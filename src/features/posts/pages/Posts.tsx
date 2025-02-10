import { getPosts } from '@api/hooks/posts'
import { Dropdown } from '@components/Dropdown'
import { PostsTable } from '@posts/components/PostsTable'
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
      },
    ],
    queryFn: getPosts,
  })

  if (error) return <span>Error loading posts</span>

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search by Title or Description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
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
      </div>

      <Dropdown
        options={statusOptions}
        onOptionClick={setStatusFilter}
        menuTrigger={<span>{status || 'Select Status'}</span>}
        className="customDropdown"
        menuClassName="customMenu"
      />
      {!isLoading && <PostsTable posts={data?.posts || []} />}
    </div>
  )
}
