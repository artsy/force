import { MetaTags } from "Components/MetaTags"
import { NotificationsListQueryRenderer } from "Components/Notifications/NotificationsList"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <NotificationsListQueryRenderer />
    </>
  )
}
