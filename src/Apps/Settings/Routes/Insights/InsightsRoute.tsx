import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { InsightsRoute_me } from "__generated__/InsightsRoute_me.graphql"
import { InsightsHeader } from "./Components/InsightsHeader"
import { InsightsOverviewFragmentContainer } from "./Components/InsightsOverview"

interface InsightsRouteProps {
  me: InsightsRoute_me
}

const InsightsRoute: React.FC<InsightsRouteProps> = ({ me }) => {
  const isInsightsEnabled = useFeatureFlag("my-collection-web-phase-7-insights")

  return (
    <>
      {isInsightsEnabled && (
        <>
          <InsightsHeader />
          <InsightsOverviewFragmentContainer info={me?.myCollectionInfo!} />
        </>
      )}
    </>
  )
}

export const InsightsRouteFragmentContainer = createFragmentContainer(
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
