import { Button, Text } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

import { FC } from "react"

interface CreateAlertFiltersStepProps {}

export const CreateAlertFiltersStep: FC<CreateAlertFiltersStepProps> = () => {
  const { steps } = useSavedSearchAlertContext()

  // < Create Alert
  // Close icon on right
  // Filters

  return (
    <>
      <Text>Step {steps.current}</Text>
      <Button
        onClick={() => {
          steps.setStep("ALERT_DETAILS")
        }}
      >
        Go to details
      </Button>
    </>
  )
}
