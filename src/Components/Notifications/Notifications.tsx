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
    <Tabs mt={1} mb={0}>
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
