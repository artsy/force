import { Z } from "Apps/Components/constants"
import { ContextualMenu, ContextualMenuItem } from "Components/ContextualMenu"
import { MarkAllAsReadPanel } from "Components/Notifications/MarkAllAsReadPanel"
import { RouterLink } from "System/Components/RouterLink"

interface NotificationsContextualMenuProps {
  onHide?: () => void
  unreadCounts: number
}

export const NotificationsContextualMenu: React.FC<
  React.PropsWithChildren<NotificationsContextualMenuProps>
> = ({ onHide, unreadCounts }) => {
  return (
    <ContextualMenu placement="bottom-start" zIndex={Z.dropdown}>
      <ContextualMenuItem p={0}>
        <MarkAllAsReadPanel unreadCounts={unreadCounts} />
      </ContextualMenuItem>
      <ContextualMenuItem p={0}>
        <RouterLink
          onClick={onHide}
          to={"/favorites/alerts"}
          textDecoration="none"
          color="black100"
          display="block"
          p={2}
        >
          Manage Alerts
        </RouterLink>
      </ContextualMenuItem>
      <ContextualMenuItem p={0}>
        <RouterLink
          onClick={onHide}
          to="/favorites/follows"
          textDecoration="none"
          color="black100"
          display="block"
          p={2}
        >
          Manage Follows
        </RouterLink>
      </ContextualMenuItem>
    </ContextualMenu>
  )
}
