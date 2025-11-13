import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export const ArtistTabs = ({ slug }: { slug: string }) => {
  const tracking = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const handleClick = (subject: string) => {
    const payload: ClickedHeader = {
      action: ActionType.clickedHeader,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      subject,
    }

    tracking.trackEvent(payload)
  }

  return (
    <RouteTabs data-test="navigationTabs">
      <RouteTab
        exact
        to={`/artist/${slug}`}
        onClick={() => handleClick("artworks")}
      >
        Artworks
      </RouteTab>

      <RouteTab
        to={`/artist/${slug}/auction-results`}
        onClick={() => handleClick("auction results")}
      >
        Auction Results
      </RouteTab>

      <RouteTab
        to={`/artist/${slug}/about`}
        onClick={() => handleClick("about")}
      >
        About
      </RouteTab>
    </RouteTabs>
  )
}
