import { Box } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <Box
        // Unconventional value here to keep visual rhythm
        mt="30px"
      >
        <Notifications />
      </Box>
    </>
  )
}
