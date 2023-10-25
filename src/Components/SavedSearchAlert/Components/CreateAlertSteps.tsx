import { Text } from "@artsy/palette"
import { CreateAlertConfirmationStep } from "Components/SavedSearchAlert/Components/CreateAlertConfirmationStep"
import { CreateAlertDetailsStep } from "Components/SavedSearchAlert/Components/CreateAlertDetailsStep"
import { CreateAlertFiltersStep } from "Components/SavedSearchAlert/Components/CreateAlertFiltersStep"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

import { FC, useState } from "react"

interface CreateAlertStepsProps {}

export const CreateAlertSteps: FC<CreateAlertStepsProps> = () => {
  const { steps } = useSavedSearchAlertContext()

  const [searchCriteriaID, setSearchCriteriaID] = useState()

  switch (steps.current) {
    case "ALERT_DETAILS":
      return (
        <CreateAlertDetailsStep
          onSubmit={value => {
            setSearchCriteriaID(value)
            steps.setStep("ALERT_CONFIRMATION")
          }}
        />
      )
    case "ALERT_FILTERS":
      return <CreateAlertFiltersStep />
    case "ALERT_CONFIRMATION":
      return <CreateAlertConfirmationStep searchCriteriaID={searchCriteriaID} />
    default:
      return <Text>Ooppss</Text>
  }
}
