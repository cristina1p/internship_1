import { Dropdown } from '@components/Dropdown'
import { FaEllipsisV } from 'react-icons/fa'

interface PostActionsProps {
  onOptionClick: (key: string) => void
}

const postOptions = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
]

export const PostActions = ({ onOptionClick }: PostActionsProps) => {
  return (
    <Dropdown
      options={postOptions}
      onOptionClick={onOptionClick}
      menuTrigger={<FaEllipsisV size={12} />}
    />
  )
}
