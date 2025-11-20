import { Z } from "Apps/Components/constants"
import {
  ContextualMenu,
  ContextualMenuItemLink,
} from "Components/ContextualMenu"
import { MarkAllAsReadPanel } from "Components/Notifications/MarkAllAsReadPanel"

interface NotificationsContextualMenuProps {
  onHide?: () => void
  unreadCounts: number
}

export const NotificationsContextualMenu: React.FC<
  React.PropsWithChildren<NotificationsContextualMenuProps>
> = ({ onHide, unreadCounts }) => {
  return (
    <ContextualMenu placement="bottom-start" zIndex={Z.dropdown}>
      <MarkAllAsReadPanel unreadCounts={unreadCounts} />

      <ContextualMenuItemLink onClick={onHide} to="/favorites/alerts">
        Manage Alerts
      </ContextualMenuItemLink>

      <ContextualMenuItemLink onClick={onHide} to="/favorites/follows">
        Manage Follows
      </ContextualMenuItemLink>
    </ContextualMenu>
  )
}
