import { AnalyticsSchema } from "v2/System"
import { useNavBarMobileMenuNavigation } from "./NavBarMobileMenuNavigation"

export const useTrackingContextModule = () => {
  const { path } = useNavBarMobileMenuNavigation()

  let contextModule:
    | typeof AnalyticsSchema.ContextModule.HeaderArtworksDropdown
    | typeof AnalyticsSchema.ContextModule.HeaderArtistsDropdown
    | typeof AnalyticsSchema.ContextModule.Header

  if (path?.[0] === "Artworks") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtworksDropdown
  } else if (path?.[0] === "Artists") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtistsDropdown
  } else {
    contextModule = AnalyticsSchema.ContextModule.Header
  }

  return contextModule
}
