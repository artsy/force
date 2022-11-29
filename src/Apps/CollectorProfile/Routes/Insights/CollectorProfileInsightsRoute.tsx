import { Text } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"

const CollectorProfileInsightsRoute: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  if (!isCollectorProfileEnabled) {
    return null
  }

  return <Text>Hola!</Text>
}

export const CollectorProfileInsightsRouteFragmentContainer = CollectorProfileInsightsRoute
