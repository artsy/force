import { Join, Spacer } from "@artsy/palette"
import { InsightsCareerHighlightRailFragmentContainer } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightRail"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { InsightsRoute_me$data } from "__generated__/InsightsRoute_me.graphql"
import { InsightsAuctionResultsFragmentContainer } from "./Components/InsightsAuctionResults"
import { InsightsHeader } from "./Components/InsightsHeader"
import { InsightsLandingPage } from "./Components/InsightsLandingPage"
import { InsightsOverviewFragmentContainer } from "./Components/InsightsOverview"

interface InsightsRouteProps {
  me: InsightsRoute_me$data
}

const InsightsRoute: React.FC<InsightsRouteProps> = ({ me }) => {
  const isInsightsEnabled = useFeatureFlag("my-collection-web-phase-7-insights")

  if (!me.myCollectionInfo?.artworksCount) {
    return <InsightsLandingPage />
  }

  return (
    <>
      {isInsightsEnabled && (
        <>
          <InsightsHeader />

          <Join separator={<Spacer my={[4, 6]} />}>
            {/* @ts-ignore RELAY_UPGRADE 13 */}
            <InsightsOverviewFragmentContainer info={me?.myCollectionInfo!} />

            <Media greaterThanOrEqual="sm">
              <InsightsCareerHighlightRailFragmentContainer
                // @ts-ignore RELAY_UPGRADE 13
                me={me}
                showProgress={true}
              />
            </Media>
            <Media lessThan="sm">
              <InsightsCareerHighlightRailFragmentContainer
                //@ts-ignore RELAY_UPGRADE 13
                me={me}
                showProgress={false}
              />
            </Media>

            {/* @ts-ignore RELAY_UPGRADE 13 */}
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
          artworksCount
          ...InsightsOverview_info
        }
        ...InsightsAuctionResults_me
        ...InsightsCareerHighlightRail_me
      }
    `,
  }
)
