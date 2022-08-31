import { Tab, Tabs } from "@artsy/palette"
import { NotificationsListQueryRenderer } from "./NotificationsList"

export const Notifications = () => {
  return (
    <Tabs>
      <Tab name="All">
        <NotificationsListQueryRenderer type="all" />
      </Tab>
      <Tab name="Alerts">
        <NotificationsListQueryRenderer type="alerts" />
      </Tab>
    </Tabs>
  )
}
