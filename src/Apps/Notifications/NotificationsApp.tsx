import { NotificationsQueryRenderer } from "./Components/Notifications"
import { MetaTags } from "Components/MetaTags"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <NotificationsQueryRenderer />
    </>
  )
}
