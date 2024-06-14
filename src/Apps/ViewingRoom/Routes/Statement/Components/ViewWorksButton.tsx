import * as React from "react"
import { RouterLink } from "System/Components/RouterLink"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { Button } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { useJump } from "Utils/Hooks/useJump"

interface ViewWorksButtonProps {
  artworksCount: number
}

export const ViewWorksButton: React.FC<ViewWorksButtonProps> = ({
  artworksCount,
}) => {
  const tracking = useTracking()

  const { jumpTo } = useJump({ offset: 20 })

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
        jumpTo("ViewingRoomTabBar")

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
