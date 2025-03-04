import { fetchUsers } from '@api/users'
import { Dropdown } from '@components/Dropdown'
import { paths } from '@helper/paths'
import { useDebounce } from '@helper/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { UsersTable } from '@users/components'
import { getRoleOptions } from '@users/helper'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import styles from './Users.module.scss'

export const Users = () => {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const { t } = useTranslation()

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
        <button
          className="buttonPrimary"
          onClick={() => navigate(paths.addUser)}
        >
          {t('users.addButton')}
        </button>
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
          menuTrigger={role ? `role.${role}` : 'role.User'}
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
