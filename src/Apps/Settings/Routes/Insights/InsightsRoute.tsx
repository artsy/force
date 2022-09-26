import { Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { InsightsRoute_me } from "__generated__/InsightsRoute_me.graphql"
import { InsightsAuctionResultsFragmentContainer } from "./Components/InsightsAuctionResults"
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
          <Join separator={<Spacer my={[4, 6]} />}>
            <InsightsOverviewFragmentContainer info={me?.myCollectionInfo!} />

            <InsightsAuctionResultsFragmentContainer me={me} />
          </Join>
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
        ...InsightsAuctionResults_me
      }
    `,
  }
)
