import { fetchUsers } from '@api/users'
import { useDebounce } from '@helper/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { UsersTable } from '@users/components'
import { t } from 'i18next'
import { useState } from 'react'

import styles from './Users.module.scss'

export const Users = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'users',
      {
        search: debouncedSearch,
        page: pagination.pageIndex,
        limit: pagination.pageSize,
      },
    ],
    queryFn: fetchUsers,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>
  }
  return (
    <div className={styles.usersContainer}>
      <div className={styles.usersHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
      </div>
      <div className={styles.filtersContainer}>
        <input
          type="text"
          placeholder={t('table.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <UsersTable
        users={data?.users || []}
        total={data?.total || 0}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}
