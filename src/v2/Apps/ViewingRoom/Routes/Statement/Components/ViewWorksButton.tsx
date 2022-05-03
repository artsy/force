import * as React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import { AnalyticsSchema, useTracking } from "v2/System"
import { Button } from "@artsy/palette"
import { useRouter } from "v2/System/Router/useRouter"
import { useScrollToElement } from "v2/Utils/Hooks/useScrollTo"

interface ViewWorksButtonProps {
  artworksCount: number
}

export const ViewWorksButton: React.FC<ViewWorksButtonProps> = ({
  artworksCount,
}) => {
  const tracking = useTracking()

  const { scrollTo } = useScrollToElement({
    selectorOrRef: "#scrollTo--ViewingRoomTabBar",
    offset: 20,
    behavior: "smooth",
  })

  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  const to = `/viewing-room/${slug}/works`

  if (artworksCount === 0) {
    return null
  }

  return (
    <Button
      width="100%"
      // @ts-ignore
      as={RouterLink}
      to={to}
      data-test="viewingRoomWorksButton"
      onClick={() => {
        scrollTo()

        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ViewWorks,
          destination_path: to,
        })
      }}
    >
      View works ({artworksCount})
    </Button>
  )
}
