import { Dropdown } from '@components/Dropdown'
import { SortOrder } from '@models/posts'
import { useState } from 'react'

import styles from '../pages/Posts.module.scss'

const sortOptions = [
  { key: 'desc', labelKey: 'sort.newest' },
  { key: 'asc', labelKey: 'sort.oldest' },
]

interface SortDropdownProps {
  onSortChange: (sortOrder: SortOrder) => void
}

export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const [selectedSort, setSelectedSort] = useState<SortOrder>('desc')

  const handleSortChange = (key: string) => {
    const sortOrder = key as SortOrder
    setSelectedSort(sortOrder)
    onSortChange(sortOrder)
  }

  return (
    <Dropdown
      options={sortOptions}
      onOptionClick={handleSortChange}
      menuTrigger={selectedSort === 'desc' ? 'sort.newest' : 'sort.oldest'}
      className={styles.dropdown}
    />
  )
}
