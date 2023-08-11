import { Join, ModalDialog, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { SuggestedArtworksModalHeader } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalHeader"
import { SuggestedArtworksModalGridQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalGrid"
import { useTranslation } from "react-i18next"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

interface SuggestedArtworksModalProps {
  onClose: () => void
}

export const SuggestedArtworksModal: FC<SuggestedArtworksModalProps> = ({
  onClose,
}) => {
  const { t } = useTranslation()
  const { criteria } = useSavedSearchAlertContext()

  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onClose}
      title={t(
        "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksModal.title"
      )}
    >
      <Join separator={<Spacer y={2} />}>
        <SuggestedArtworksModalHeader />
        <Separator />
        <SuggestedArtworksModalGridQueryRenderer
          {...criteria}
          onClose={onClose}
        />
      </Join>
    </ModalDialog>
  )
}
