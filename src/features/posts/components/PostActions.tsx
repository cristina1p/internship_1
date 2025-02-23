import { Dropdown } from '@components/Dropdown'
import { FaEllipsisV } from 'react-icons/fa'

interface PostActionsProps {
  onOptionClick: (key: string) => void
}

const postOptions = [
  { key: 'edit', labelKey: 'options.Edit' },
  { key: 'delete', labelKey: 'options.Delete' },
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
