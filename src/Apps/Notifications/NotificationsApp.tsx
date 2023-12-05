import { FullBleed } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = props => {
  const { me } = props

  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <FullBleed>
        <Notifications
          mode="page"
          unreadCounts={me.unreadNotificationsCount ?? 0}
        />
      </FullBleed>
    </>
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
