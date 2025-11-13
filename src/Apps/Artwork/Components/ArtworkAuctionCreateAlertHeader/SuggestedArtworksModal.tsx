import { SuggestedArtworksModalGridQueryRenderer } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalGrid"
import { SuggestedArtworksModalHeader } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalHeader"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { Join, ModalDialog, Spacer } from "@artsy/palette"
import type { FC } from "react"

interface SuggestedArtworksModalProps {
  onClose: () => void
}

export const SuggestedArtworksModal: FC<
  React.PropsWithChildren<SuggestedArtworksModalProps>
> = ({ onClose }) => {
  const { criteria, entity } = useSavedSearchAlertContext()
  const artistName = entity.defaultCriteria?.artistIDs?.[0].displayValue ?? ""

  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onClose}
      title={`Works by ${artistName}`}
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
