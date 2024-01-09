import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { Media } from "Utils/Responsive"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"
import { NotificationsDesktopLayout } from "Components/Notifications/NotificationsLayout"

export const MENU_HEIGHT = 100

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  return (
    <NotificationsContextProvider>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <Media greaterThan="xs">
        <NotificationsDesktopLayout
          unreadNotificationsCount={me.unreadNotificationsCount}
        />
      </Media>

      <Media at="xs">
        <Notifications
          mode="page"
          unreadCounts={me.unreadNotificationsCount ?? 0}
        />
      </Media>
    </NotificationsContextProvider>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    me: graphql`
      fragment NotificationsApp_me on Me {
        unreadNotificationsCount
      }
    `,
  }
)
