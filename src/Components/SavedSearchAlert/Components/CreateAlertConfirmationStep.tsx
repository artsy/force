import { Text } from "@artsy/palette"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
import { ConfirmationArtworksGridQueryRenderer } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

import { FC } from "react"

interface CreateAlertConfirmationStepProps {
  searchCriteriaID?: string
}

export const CreateAlertConfirmationStep: FC<CreateAlertConfirmationStepProps> = ({
  searchCriteriaID,
}) => {
  const { steps, criteria, currentArtworkID } = useSavedSearchAlertContext()

  return (
    <>
      <Text>Step {steps.current}</Text>
      <Text>SearchCriteria ID: {searchCriteriaID}</Text>
      <ConfirmationModalHeader />
      <ConfirmationArtworksGridQueryRenderer
        onClose={() => false}
        searchCriteriaId={searchCriteriaID!}
        {...criteria}
        excludeArtworkIDs={currentArtworkID ? [currentArtworkID] : undefined}
      />
    </>
  )
}
