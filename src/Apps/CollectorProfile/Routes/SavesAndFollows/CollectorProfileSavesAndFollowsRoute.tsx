import { Text } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"

const CollectorProfileSavesAndFollowsRoute: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  if (!isCollectorProfileEnabled) {
    return null
  }

  return <Text>Yo!</Text>
}

export const CollectorProfileSavesAndFollowsRouteFragmentContainer = CollectorProfileSavesAndFollowsRoute
