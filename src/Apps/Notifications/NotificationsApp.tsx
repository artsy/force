import { FullBleed } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_notifications } from "__generated__/NotificationsApp_notifications.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { NotificationsListFragmentContainer } from "./Components/NotificationsList"
import { MetaTags } from "Components/MetaTags"

interface NotificationsAppProps {
  notifications: NotificationsApp_notifications
}

export const NotificationsApp: React.FC<NotificationsAppProps> = ({
  notifications,
}) => {
  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <FullBleed>
        <AppContainer>
          <HorizontalPadding my={1}>
            <NotificationsListFragmentContainer notifications={notifications} />
          </HorizontalPadding>
        </AppContainer>
      </FullBleed>
    </>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    notifications: graphql`
      fragment NotificationsApp_notifications on NotificationConnection {
        ...NotificationsList_notifications
      }
    `,
  }
)
