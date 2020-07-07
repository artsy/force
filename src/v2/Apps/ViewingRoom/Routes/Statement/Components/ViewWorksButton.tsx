import React from "react"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { scrollToId } from "../Utils/scrollToId"
import { AnalyticsSchema, useTracking } from "v2/Artsy"
import { Button } from "@artsy/palette"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface ViewWorksButtonProps {
  artworksCount: number
}

export const ViewWorksButton: React.FC<ViewWorksButtonProps> = ({
  artworksCount,
}) => {
  const tracking = useTracking()

  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  const navigateTo = `/viewing-room/${slug}/works`

  if (artworksCount === 0) {
    return null
  }

  return (
    <RouterLink
      to={navigateTo}
      data-test="viewingRoomWorksButton"
      onClick={() => {
        scrollToId("viewingRoomTabBarAnchor")
        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ViewWorks,
          destination_path: navigateTo,
        })
      }}
    >
      <Button size="large" width="100%">
        View works ({artworksCount})
      </Button>
    </RouterLink>
  )
}
