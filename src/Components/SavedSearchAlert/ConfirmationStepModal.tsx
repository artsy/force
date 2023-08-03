import { Join, ModalDialog, Spacer } from "@artsy/palette"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
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
    >
      <Join separator={<Spacer y={2} />}>
        <ConfirmationModalHeader />
        <ConfirmationArtworksGridQueryRenderer
          searchCriteriaId={searchCriteriaId}
          onClose={onClose}
          {...criteria}
        />
      </Join>
    </ModalDialog>
  )
}
