import { Button } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Router/RouterLink"
import { NUMBER_OF_ARTWORKS_TO_SHOW } from "./SuggestedArtworksModalGrid"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { searchCriteriaHref } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"

interface SuggestedArtworksModalFooterProps {
  criteria: SearchCriteriaAttributes
  artworksCount: number
  artistSlug: string
  onClose: () => void
}

export const SuggestedArtworksModalFooter: FC<SuggestedArtworksModalFooterProps> = ({
  criteria,
  artworksCount,
  artistSlug,
  onClose,
}) => {
  const { t } = useTranslation()

  if (artworksCount <= NUMBER_OF_ARTWORKS_TO_SHOW) return null

  return (
    <Button
      width="100%"
      // @ts-ignore
      as={RouterLink}
      to={searchCriteriaHref(artistSlug, criteria)}
      onClick={() => {
        onClose()
      }}
    >
      {t(
        "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.seeAllMatchingWorks"
      )}
    </Button>
  )
}
