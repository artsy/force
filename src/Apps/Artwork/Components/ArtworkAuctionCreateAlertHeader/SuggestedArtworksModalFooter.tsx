import { Button } from "@artsy/palette"
import { FC } from "react"

import { RouterLink } from "System/Components/RouterLink"
import { NUMBER_OF_ARTWORKS_TO_SHOW } from "./SuggestedArtworksModalGrid"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

interface SuggestedArtworksModalFooterProps {
  artworksCount: number
  onClose: () => void
}

export const SuggestedArtworksModalFooter: FC<SuggestedArtworksModalFooterProps> = ({
  artworksCount,
  onClose,
}) => {
  const { criteriaHref } = useSavedSearchAlertContext()

  if (artworksCount <= NUMBER_OF_ARTWORKS_TO_SHOW) return null

  return (
    <Button
      width="100%"
      // @ts-ignore
      as={RouterLink}
      to={criteriaHref()}
      onClick={() => {
        onClose()
      }}
    >
      Explore more on Artsy
    </Button>
  )
}
