import { ActionType, ContextModule } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import type { FC } from "react"

import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"
import { NUMBER_OF_ARTWORKS_TO_SHOW } from "./SuggestedArtworksModalGrid"

interface SuggestedArtworksModalFooterProps {
  artworksCount: number
  onClose: () => void
}

export const SuggestedArtworksModalFooter: FC<
  React.PropsWithChildren<SuggestedArtworksModalFooterProps>
> = ({ artworksCount, onClose }) => {
  const { criteriaHref } = useSavedSearchAlertContext()
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  if (artworksCount <= NUMBER_OF_ARTWORKS_TO_SHOW) return null

  return (
    <Button
      width="100%"
      // @ts-ignore
      as={RouterLink}
      to={criteriaHref()}
      onClick={() => {
        onClose()
        trackEvent({
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.artworkClosedLotHeader,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          context_page_owner_type: contextPageOwnerType,
          type: "viewAll",
        })
      }}
    >
      Explore more on Artsy
    </Button>
  )
}
