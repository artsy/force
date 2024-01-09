import { Column, Flex, GridColumns } from "@artsy/palette"
import { Notifications } from "Components/Notifications/Notifications"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"

const DESKTOP_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`
const MIN_LIST_WIDTH = 340

interface NotificationsLayoutProps {
  unreadNotificationsCount: number
}

export const NotificationsDesktopLayout: React.FC<NotificationsLayoutProps> = ({
  unreadNotificationsCount,
}) => {
  return (
    <GridColumns>
      <Column span={3} borderRight="1px solid #ddd" minWidth={MIN_LIST_WIDTH}>
        <Flex height={DESKTOP_HEIGHT} flexDirection="column">
          <Notifications
            mode="page"
            unreadCounts={unreadNotificationsCount ?? 0}
          />
        </Flex>
      </Column>

      <Column span={9}>
        <Flex flexDirection="column" height={DESKTOP_HEIGHT} overflow="auto">
          <NotificationQueryRenderer />
        </Flex>
      </Column>
    </GridColumns>
  )
}
