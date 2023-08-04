import { Join, ModalDialog, Separator, Spacer } from "@artsy/palette"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { FC } from "react"
import { SuggestedArtworksModalHeader } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalHeader"
import { SuggestedArtworksModalGridQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalGrid"
import { useTranslation } from "react-i18next"

interface SuggestedArtworksModalProps {
  criteria: SearchCriteriaAttributes
  entity: SavedSearchEntity
  artistSlug: string
  onClose: () => void
}

export const SuggestedArtworksModal: FC<SuggestedArtworksModalProps> = ({
  criteria,
  entity,
  artistSlug,
  onClose,
}) => {
  const { t } = useTranslation()
  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onClose}
      title={t(
        "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.title"
      )}
    >
      <Join separator={<Spacer y={2} />}>
        <SuggestedArtworksModalHeader criteria={criteria} entity={entity} />
        <Separator />
        <SuggestedArtworksModalGridQueryRenderer
          {...criteria}
          artistSlug={artistSlug}
          onClose={onClose}
        />
      </Join>
    </ModalDialog>
  )
}
