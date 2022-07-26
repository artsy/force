import * as React from "react"
import { RouterLink } from "System/Router/RouterLink"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { Button } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"
import { useScrollToElement } from "Utils/Hooks/useScrollTo"

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
          action_type: DeprecatedAnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module:
            DeprecatedAnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: DeprecatedAnalyticsSchema.Subject.ViewWorks,
          destination_path: to,
        })
      }}
    >
      View works ({artworksCount})
    </Button>
  )
}
