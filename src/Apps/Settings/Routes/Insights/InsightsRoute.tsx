import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { InsightsRoute_me } from "__generated__/InsightsRoute_me.graphql"
import { InsightsOverviewFragmentContainer } from "./Components/InsightsOverview"

interface InsightsRouteProps {
  me: InsightsRoute_me
}

const InsightsRoute: React.FC<InsightsRouteProps> = ({ me }) => {
  const isInsightsEnabled = useFeatureFlag("my-collection-web-phase-7-insights")

  return (
    <>
      <Text>Sup</Text>

      {isInsightsEnabled && (
        <InsightsOverviewFragmentContainer info={me?.myCollectionInfo!} />
      )}
    </>
  )
}

export const InsightsRouteRefetchContainer = createFragmentContainer(
  InsightsRoute,
  {
    me: graphql`
      fragment InsightsRoute_me on Me {
        internalID
        myCollectionInfo {
          ...InsightsOverview_info
        }
      }
    `,
  }
)
