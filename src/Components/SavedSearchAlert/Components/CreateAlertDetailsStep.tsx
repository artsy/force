import { Button, Text } from "@artsy/palette"
import { SavedSearchAlertModal } from "Components/SavedSearchAlert/FiltersSavedSearchAlertModal"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { DEFAULT_FREQUENCY } from "Components/SavedSearchAlert/constants"

import { FC } from "react"

interface CreateAlertDetailsStepProps {
  onSubmit: (string) => void
}

export const CreateAlertDetailsStep: FC<CreateAlertDetailsStepProps> = ({
  onSubmit,
}) => {
  const { steps, entity } = useSavedSearchAlertContext()

  // Create Alert header
  // Close icon on right
  // Form
  // > Add filters CTA
  // Create alert button

  return (
    <>
      <Text>Step {steps.current}</Text>
      <Button
        onClick={() => {
          steps.setStep("ALERT_FILTERS")
        }}
      >
        Go to filters
      </Button>
      <SavedSearchAlertModal
        onCreateAlert={result => {
          console.log("onCreateAlert")
          onSubmit(result.id)
        }}
        initialValues={{
          name: "",
          email: true,
          push: true,
          details: "",
          frequency: DEFAULT_FREQUENCY,
        }}
        entity={entity}
        onClose={() => {
          console.log("DONE")
        }}
      />
    </>
  )
}
