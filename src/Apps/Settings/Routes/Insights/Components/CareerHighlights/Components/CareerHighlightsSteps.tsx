import { Text } from "@artsy/palette"
import { CareerHighlightModalStep } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Components/CareerHighlightModalStep"
import { useCareerHighlightsStoriesContext } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Hooks/useCareerHighlightsStoriesContext"

export const CareerHighlightSteps = () => {
  const { current } = useCareerHighlightsStoriesContext()

  switch (current) {
    case "BIENNIAL":
      return <CareerHighlightModalStep />
    case "SOLO_SHOW":
      return <Text>SOLO_SHOW</Text>
    case "GROUP_SHOW":
      return <Text>GROUP_SHOW</Text>
    case "COLLECTED":
      return <Text>COLLECTED</Text>
    case "REVIEWED":
      return <Text>REVIEWED</Text>
    case "PROMO":
      return <Text>PROMO</Text>

    default:
      return null
  }
}
