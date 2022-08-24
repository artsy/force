import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NotificationsListQueryRenderer } from "./Components/NotificationsList"
import { MetaTags } from "Components/MetaTags"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <FullBleed>
        <AppContainer>
          <HorizontalPadding my={1}>
            <NotificationsListQueryRenderer />
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </>
  )
}
