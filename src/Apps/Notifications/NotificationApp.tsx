import { FullBleed } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationApp_me$data } from "__generated__/NotificationApp_me.graphql"
import { NotificationFragmentContainer } from "Components/Notifications/Notification"

interface NotificationAppProps {
  me: NotificationApp_me$data
}

const NotificationApp: React.FC<NotificationAppProps> = ({ me }) => {
  return (
    <>
      <MetaTags title="Notification | Artsy" pathname="/notification" />

      <FullBleed>
        <NotificationFragmentContainer me={me} />
      </FullBleed>
    </>
  )
}

export const NotificationAppFragmentContainer = createFragmentContainer(
  NotificationApp,
  {
    me: graphql`
      fragment NotificationApp_me on Me
        @argumentDefinitions(notificationId: { type: "String!" }) {
        ...Notification_me @arguments(notificationId: $notificationId)
      }
    `,
  }
)
