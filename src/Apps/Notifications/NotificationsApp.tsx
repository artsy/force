import { MetaTags } from "Components/MetaTags"
import { NotificationsQueryRenderer } from "Components/Notifications/Notifications"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <NotificationsQueryRenderer />
    </>
  )
}
