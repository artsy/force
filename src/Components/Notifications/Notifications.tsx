import { Tab, Tabs } from "@artsy/palette"
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
      </Tab>
    </Tabs>
  )
}
