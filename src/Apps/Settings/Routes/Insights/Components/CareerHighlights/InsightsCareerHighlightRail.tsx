import { Shelf } from "@artsy/palette"
import { InsightsCareerHighlightCard } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightCard"
import { InsightsCareerHighlightPromoCard } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightPromoCard"
import { CareerHighlightKind } from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsCareerHighlightRail_me$data } from "__generated__/InsightsCareerHighlightRail_me.graphql"

interface InsightsCareerHighlightRailProps {
  me: InsightsCareerHighlightRail_me$data
}

const InsightsCareerHighlightRail: React.FC<InsightsCareerHighlightRailProps> = ({
  me,
}) => {
  const { myCollectionInfo } = me
  if (!myCollectionInfo?.artistInsightsCount) {
    return null
  }

  const careerHighlights = Object.entries(myCollectionInfo.artistInsightsCount)
    .map(([kind, count]) => ({ kind: kind as CareerHighlightKind, count }))
    .filter(a => a.count > 0)

  if (careerHighlights.length === 0) {
    return null
  }

  return (
    <Shelf alignItems="flex-start" showProgress>
      {[
        ...careerHighlights.map(({ kind, count }, i) => (
          <InsightsCareerHighlightCard key={i} count={count} kind={kind} />
        )),
        <InsightsCareerHighlightPromoCard />,
      ]}
    </Shelf>
  )
}

export const InsightsCareerHighlightRailFragmentContainer = createFragmentContainer(
  InsightsCareerHighlightRail,
  {
    me: graphql`
      fragment InsightsCareerHighlightRail_me on Me {
        myCollectionInfo {
          artistInsightsCount {
            BIENNIAL: biennialCount
            COLLECTED: collectedCount
            GROUP_SHOW: groupShowCount
            SOLO_SHOW: soloShowCount
            REVIEWED: reviewedCount
          }
        }
      }
    `,
  }
)
