import { Separator, Tab, Tabs } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import {
  NotificationPaginationType,
  NotificationsListQueryRenderer,
} from "./NotificationsList"

interface NotificationsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
}) => {
  return (
    <Tabs>
      <Tab name="All">
        <NotificationsListQueryRenderer
          type="all"
          paginationType={paginationType}
        />
      </Tab>
      <Tab name="Alerts">
        <NotificationsListQueryRenderer
          type="alerts"
          paginationType={paginationType}
        />

        <Separator mb={2} />

        <RouterLink
          to="/settings/alerts"
          color="black60"
          display="flex"
          justifyContent="center"
        >
          Manage your alerts
        </RouterLink>
      </Tab>
    </Tabs>
  )
}
