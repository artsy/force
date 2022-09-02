import { Tab } from "@artsy/palette"
import {
  NotificationPaginationType,
  NotificationsListQueryRenderer,
} from "./NotificationsList"
import { NofiticationsTabs } from "./NotificationsTabs"

interface NotificationsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
}) => {
  return (
    <NofiticationsTabs>
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
      </Tab>
    </NofiticationsTabs>
  )
}
