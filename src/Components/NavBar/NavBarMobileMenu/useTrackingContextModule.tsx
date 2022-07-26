import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"

export const useTrackingContextModule = () => {
  const { path } = useNavBarMobileMenuNavigation()

  let contextModule:
    | typeof DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
    | typeof DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown
    | typeof DeprecatedAnalyticsSchema.ContextModule.Header

  if (path?.[0] === "Artworks") {
    contextModule =
      DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown
  } else if (path?.[0] === "Artists") {
    contextModule =
      DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown
  } else {
    contextModule = DeprecatedAnalyticsSchema.ContextModule.Header
  }

  return contextModule
}
