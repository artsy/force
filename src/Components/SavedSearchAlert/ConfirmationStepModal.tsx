import { Join, ModalDialog, Spacer } from "@artsy/palette"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
import { ConfirmationStepFooterQueryRenderer } from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { FC } from "react"

interface ConfirmationStepModalProps {
  searchCriteriaId: string
  onComplete: () => void
}

// TODO: onComplete => onClose
// TODO: translations
// TODO: width 500 or 700
export const ConfirmationStepModal: FC<ConfirmationStepModalProps> = props => {
  const { searchCriteriaId, onComplete } = props

  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onComplete}
      title="Your alert has been saved."
      header={<ConfirmationModalHeader />}
    >
      <Join separator={<Spacer y={2} />}>
        <ConfirmationArtworksGridQueryRenderer
          searchCriteriaId={searchCriteriaId}
        />
        <ConfirmationStepFooterQueryRenderer
          searchCriteriaId={searchCriteriaId}
        />
      </Join>
    </ModalDialog>
  )
}
