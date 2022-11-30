import { Text } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"

const CollectorProfileMyCollectionRoute: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  if (!isCollectorProfileEnabled) {
    return null
  }

  return <Text>Ja Hallo!</Text>
}

export const CollectorProfileMyCollectionRouteFragmentContainer = CollectorProfileMyCollectionRoute
