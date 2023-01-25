import { Tab } from "@artsy/palette"
import { NofiticationsTabs, NofiticationsTabsProps } from "./NotificationsTabs"
import { NotificationsListQueryRenderer } from "./NotificationsList"
import { NotificationPaginationType } from "./types"

interface NotificationsProps extends NofiticationsTabsProps {
  paginationType?: NotificationPaginationType
  setLastSeenNotificationDateTime: (lastDateTime: string) => void
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
  setLastSeenNotificationDateTime,
  ...rest
}) => {
  return (
    <NofiticationsTabs {...rest}>
      <Tab name="All">
        <NotificationsListQueryRenderer
          type="all"
          paginationType={paginationType}
          setLastSeenNotificationDateTime={setLastSeenNotificationDateTime}
        />
      </Tab>
      <Tab name="Alerts">
        <NotificationsListQueryRenderer
          type="alerts"
          paginationType={paginationType}
          setLastSeenNotificationDateTime={setLastSeenNotificationDateTime}
        />
      </Tab>
    </NofiticationsTabs>
  )
}
