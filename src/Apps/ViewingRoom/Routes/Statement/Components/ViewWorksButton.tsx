import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useJump } from "Utils/Hooks/useJump"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button } from "@artsy/palette"
import type * as React from "react"
import { useTracking } from "react-tracking"

interface ViewWorksButtonProps {
  artworksCount: number
}

export const ViewWorksButton: React.FC<
  React.PropsWithChildren<ViewWorksButtonProps>
> = ({ artworksCount }) => {
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
      // @ts-expect-error
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
