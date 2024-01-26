import { ContextualMenu, ContextualMenuItem } from "Components/ContextualMenu"
import { MarkAllAsReadPanel } from "Components/Notifications/MarkAllAsReadPanel"
import { Z } from "Apps/Components/constants"
import { RouterLink } from "System/Router/RouterLink"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"

interface NotificationsContextualMenuProps {
  unreadCounts: number
}

export const NotificationsContextualMenu: React.FC<NotificationsContextualMenuProps> = ({
  unreadCounts,
}) => {
  return (
    <ContextualMenu placement="bottom-start" zIndex={Z.dropdown}>
      <ContextualMenuItem p={0}>
        <MarkAllAsReadPanel unreadCounts={unreadCounts} />
      </ContextualMenuItem>
      <ContextualMenuItem p={0}>
        <RouterLink
          to={BASE_SAVES_PATH}
          textDecoration="none"
          color="black100"
          display="block"
          p={2}
        >
          Manage Saves
        </RouterLink>
      </ContextualMenuItem>
      <ContextualMenuItem p={0}>
        <RouterLink
          to="/collector-profile/follows"
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
