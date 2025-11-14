import { Join, Spacer } from "@artsy/palette"
import { InsightsCareerHighlightRailFragmentContainer } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightRail"
import { InsightsMedianSalePriceFragmentContainer } from "Apps/Settings/Routes/Insights/Components/InsightsMedianSalePrice"
import { MetaTags } from "Components/MetaTags"
import { useFlag } from "@unleash/proxy-client-react"
import { Media } from "Utils/Responsive"
import type { InsightsRoute_me$data } from "__generated__/InsightsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsAuctionResultsFragmentContainer } from "./Components/InsightsAuctionResults"
import { InsightsHeader } from "./Components/InsightsHeader"
import { InsightsLandingPage } from "./Components/InsightsLandingPage"
import { InsightsOverviewFragmentContainer } from "./Components/InsightsOverview"

export interface InsightsRouteProps {
  me: InsightsRoute_me$data
}

const InsightsRoute: React.FC<React.PropsWithChildren<InsightsRouteProps>> = ({
  me,
}) => {
  const isCareerHighlightEnabled = useFlag(
    "my-collection-web-phase-7-career-highlights",
  )
  const isMedianSalePriceEnabled = useFlag(
    "my-collection-web-phase-7-median-sale-price",
  )

  if (!me.myCollectionInfo?.artworksCount) {
    return <InsightsLandingPage />
  }

  return (
    <>
      <MetaTags
        title="Insights | Artsy"
        pathname={"collector-profile/insights"}
      />

      <>
        <Media greaterThan="xs">
          <InsightsHeader />
        </Media>

        <Join separator={<Spacer y={[4, 6]} />}>
          <InsightsOverviewFragmentContainer info={me?.myCollectionInfo!} />

          {!!isCareerHighlightEnabled && (
            <>
              <Media greaterThanOrEqual="sm">
                <InsightsCareerHighlightRailFragmentContainer
                  me={me}
                  showProgress={true}
                />
              </Media>
              <Media lessThan="sm">
                <InsightsCareerHighlightRailFragmentContainer
                  me={me}
                  showProgress={false}
                />
              </Media>
            </>
          )}

          <InsightsAuctionResultsFragmentContainer me={me} />

          {!!isMedianSalePriceEnabled && (
            <InsightsMedianSalePriceFragmentContainer me={me} />
          )}
        </Join>
      </>
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
        ...InsightsMedianSalePrice_me
      }
    `,
  },
)
