import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me } from "__generated__/NotificationsApp_me.graphql"

interface NotificationsAppProps {
  me: NotificationsApp_me
}

export const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  return <Text>{me.email}</Text>
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    me: graphql`
      fragment NotificationsApp_me on Me {
        email
      }
    `,
  }
)
