import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsRoute_me } from "__generated__/InsightsRoute_me.graphql"

interface InsightsRouteProps {
  me: InsightsRoute_me
}

const InsightsRoute: React.FC<InsightsRouteProps> = ({ me }) => {
  return <Text>Sup</Text>
}

export const InsightsRouteFragmentContainer = createFragmentContainer(
  InsightsRoute,
  {
    me: graphql`
      fragment InsightsRoute_me on Me {
        internalID
      }
    `,
  }
)
