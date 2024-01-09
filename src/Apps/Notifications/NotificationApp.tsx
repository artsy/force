import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationApp_me$data } from "__generated__/NotificationApp_me.graphql"
import { NotificationFragmentContainer } from "Components/Notifications/Notification"
import { Media } from "Utils/Responsive"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"
import { NotificationsDesktopLayout } from "Components/Notifications/NotificationsLayout"
import { useRouter } from "found"

interface NotificationAppProps {
  me: NotificationApp_me$data
}

const NotificationApp: React.FC<NotificationAppProps> = ({ me }) => {
  const { match } = useRouter()

  return (
    <NotificationsContextProvider>
      <MetaTags
        title="Notifications | Artsy"
        pathname={`/notification/${match.params.notificationId}`}
      />

      <Media greaterThan="xs">
        <NotificationsDesktopLayout
          unreadNotificationsCount={me.unreadNotificationsCount}
        />
      </Media>

      <Media at="xs">
        <NotificationFragmentContainer me={me} />
      </Media>
    </NotificationsContextProvider>
  )
}

export const NotificationAppFragmentContainer = createFragmentContainer(
  NotificationApp,
  {
    me: graphql`
      fragment NotificationApp_me on Me
        @argumentDefinitions(notificationId: { type: "String!" }) {
        unreadNotificationsCount
        ...Notification_me @arguments(notificationId: $notificationId)
      }
    `,
  }
)
