import { Join, ModalDialog, Spacer } from "@artsy/palette"
import { FC } from "react"
import { SuggestedArtworksModalHeader } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalHeader"
import { SuggestedArtworksModalGridQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalGrid"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

interface SuggestedArtworksModalProps {
  onClose: () => void
}

export const SuggestedArtworksModal: FC<SuggestedArtworksModalProps> = ({
  onClose,
}) => {
  const { criteria, entity } = useSavedSearchAlertContext()
  const artistName = entity.defaultCriteria?.artistIDs?.[0].displayValue ?? ""

  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onClose}
      title={"Works by " + artistName}
    >
      <Join separator={<Spacer y={2} />}>
        <SuggestedArtworksModalHeader />
        <SuggestedArtworksModalGridQueryRenderer
          {...criteria}
          onClose={onClose}
        />
      </Join>
    </ModalDialog>
  )
}
