import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NotificationsQueryRenderer } from "./Components/Notifications"
import { MetaTags } from "Components/MetaTags"

export const NotificationsApp: React.FC = () => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <FullBleed>
        <AppContainer>
          <HorizontalPadding my={1}>
            <NotificationsQueryRenderer />
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </>
  )
}
