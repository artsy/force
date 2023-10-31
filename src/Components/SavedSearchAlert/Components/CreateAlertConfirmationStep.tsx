import { Flex, Join, Spacer, Text } from "@artsy/palette"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { t } from "i18next"

import { FC } from "react"

interface CreateAlertConfirmationStepProps {
  searchCriteriaID?: string
}

export const CreateAlertConfirmationStep: FC<CreateAlertConfirmationStepProps> = ({
  searchCriteriaID,
}) => {
  const { criteria, currentArtworkID } = useSavedSearchAlertContext()

  return (
    <Flex flexDirection="column" p={2}>
      <Text variant="lg">{t("createAlertModal.confirmationStep.saved")}</Text>
      <Join separator={<Spacer y={2} />}>
        <ConfirmationModalHeader />
        <ConfirmationArtworksGridQueryRenderer
          onClose={() => false}
          searchCriteriaId={searchCriteriaID!}
          excludeArtworkIDs={currentArtworkID ? [currentArtworkID] : undefined}
          {...criteria}
        />
      </Join>
    </Flex>
  )
}
