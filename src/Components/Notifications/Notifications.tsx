import { Tab } from "@artsy/palette"
import { NofiticationsTabs, NofiticationsTabsProps } from "./NotificationsTabs"
import { NotificationsListQueryRenderer } from "./NotificationsList"
import { NotificationPaginationType } from "./types"

interface NotificationsProps extends NofiticationsTabsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
  ...rest
}) => {
  return (
    <NofiticationsTabs {...rest}>
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
