import { Join, ModalDialog, Spacer } from "@artsy/palette"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
import { ConfirmationStepFooterQueryRenderer } from "Components/SavedSearchAlert/Components/ConfirmationStepFooter"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface ConfirmationStepModalProps {
  searchCriteriaId: string
  onClose: () => void
}

export const ConfirmationStepModal: FC<ConfirmationStepModalProps> = ({
  searchCriteriaId,
  onClose,
}) => {
  const { criteria } = useSavedSearchAlertContext()
  const { t } = useTranslation()

  return (
    <ModalDialog
      width={["100%", 700]}
      onClose={onClose}
      title={t("createAlertModal.confirmationStep.saved")}
      header={<ConfirmationModalHeader />}
    >
      <Join separator={<Spacer y={2} />}>
        <ConfirmationArtworksGridQueryRenderer {...criteria} />
        <ConfirmationStepFooterQueryRenderer
          searchCriteriaId={searchCriteriaId}
          onClose={onClose}
        />
      </Join>
    </ModalDialog>
  )
}
