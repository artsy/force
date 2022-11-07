import { CareerHighlightModalPromoStep } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightModalPromoStep"
import { CareerHighlightModalStep } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightModalStep"
import { useCareerHighlightsStoriesContext } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Hooks/useCareerHighlightsStoriesContext"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CareerHighlightsStepsQuery } from "__generated__/CareerHighlightsStepsQuery.graphql"

export const CareerHighlightSteps = () => {
  const { current } = useCareerHighlightsStoriesContext()
  const { me } = useLazyLoadQuery<CareerHighlightsStepsQuery>(
    careerHighlightsStepsQuery,
    {}
  )

  switch (current) {
    case "BIENNIAL":
    case "SOLO_SHOW":
    case "GROUP_SHOW":
    case "COLLECTED":
    case "REVIEWED":
      return (
        <CareerHighlightModalStep
          kind={current}
          careerHighlight={me?.myCollectionInfo?.[current]}
        />
      )

    case "PROMO":
      return <CareerHighlightModalPromoStep />

    default:
      return null
  }
}

const careerHighlightsStepsQuery = graphql`
  query CareerHighlightsStepsQuery {
    me {
      myCollectionInfo {
        BIENNIAL: artistInsights(kind: BIENNIAL) {
          ...CareerHighlightModalStep_careerHighlight
        }
        COLLECTED: artistInsights(kind: COLLECTED) {
          ...CareerHighlightModalStep_careerHighlight
        }
        GROUP_SHOW: artistInsights(kind: GROUP_SHOW) {
          ...CareerHighlightModalStep_careerHighlight
        }
        REVIEWED: artistInsights(kind: REVIEWED) {
          ...CareerHighlightModalStep_careerHighlight
        }
        SOLO_SHOW: artistInsights(kind: SOLO_SHOW) {
          ...CareerHighlightModalStep_careerHighlight
        }
      }
    }
  }
`
