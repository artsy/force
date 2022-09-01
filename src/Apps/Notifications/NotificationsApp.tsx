import { Spacer } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <Spacer mt={2} />

      <Notifications />
    </>
  )
}
