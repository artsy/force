import { Shelf } from "@artsy/palette"
import { useCareerHighlightsStoriesModal } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Hooks/useCareerHighlightsStoriesModal"
import { InsightsCareerHighlightCard } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightCard"
import { InsightsCareerHighlightPromoCard } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/InsightsCareerHighlightPromoCard"
import { CareerHighlightKind } from "Apps/Settings/Routes/Insights/Utils/getCareerHighlight"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsCareerHighlightRail_me$data } from "__generated__/InsightsCareerHighlightRail_me.graphql"

interface InsightsCareerHighlightRailProps {
  me: InsightsCareerHighlightRail_me$data
  showProgress?: boolean
}

const InsightsCareerHighlightRail: React.FC<InsightsCareerHighlightRailProps> = ({
  me,
  showProgress = true,
}) => {
  const { myCollectionInfo } = me
  const careerHighlights = Object.entries(
    myCollectionInfo?.artistInsightsCount || {}
  )
    .map(([kind, count]) => ({ kind: kind as CareerHighlightKind, count }))
    .filter(a => a.count > 0)

  const {
    careerHighlightsStoriesModalComponent,
    showCareerHighlightsStoriesModal,
  } = useCareerHighlightsStoriesModal({
    careerHighlights: [...careerHighlights.map(ch => ch.kind), "PROMO"],
  })

  if (careerHighlights.length === 0) {
    return null
  }

  return (
    <>
      <Shelf alignItems="flex-start" showProgress={showProgress}>
        {[
          ...careerHighlights.map(({ kind, count }, i) => (
            <InsightsCareerHighlightCard
              key={i}
              count={count}
              kind={kind}
              onClick={showCareerHighlightsStoriesModal}
            />
          )),
          <InsightsCareerHighlightPromoCard />,
        ]}
      </Shelf>

      {careerHighlightsStoriesModalComponent}
    </>
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
