import { fetchUsers } from '@api/users'
import { Dropdown } from '@components/Dropdown'
import { useDebounce } from '@helper/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { UsersTable } from '@users/components'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import styles from './Users.module.scss'

const getRoleOptions = [
  { key: '', labelKey: 'role.all' },
  { key: 'User', labelKey: 'role.User' },
  { key: 'Moderator', labelKey: 'role.Moderator' },
  { key: 'Admin', labelKey: 'role.Admin' },
]

export const Users = () => {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Reset the page to 1 on any of these filters or search change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search, role])

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'users',
      {
        search: debouncedSearch,
        role,
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
        <h1 className={styles.pageTitle}>{t('users.pageTitle')}</h1>
      </div>
      <div className={styles.filtersContainer}>
        <input
          type="text"
          placeholder={t('table.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Dropdown
          options={getRoleOptions}
          onOptionClick={setRole}
          menuTrigger={role ? `role.${role}` : 'role.all'}
          className={styles.dropdown}
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
