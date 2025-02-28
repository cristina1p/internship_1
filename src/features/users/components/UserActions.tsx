import { Dropdown } from '@components/Dropdown'
import { FaEllipsisV } from 'react-icons/fa'

interface UserActionsProps {
  onOptionClick: (key: string) => void
}

const userOptions = [
  { key: 'edit', labelKey: 'options.Edit' },
  { key: 'delete', labelKey: 'options.Delete' },
]

export const UserActions = ({ onOptionClick }: UserActionsProps) => {
  return (
    <Dropdown
      options={userOptions}
      onOptionClick={onOptionClick}
      menuTrigger={<FaEllipsisV size={12} />}
    />
  )
}
