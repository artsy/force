import { Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { FiltersHeader } from "Components/Alert/Components/Steps/StepsHeader/FiltersHeader"
import { ConfirmationHeader } from "Components/Alert/Components/Steps/StepsHeader/ConfirmationHeader"

export const ModalHeader: FC = () => {
  const { current, state } = useAlertContext()

  switch (current) {
    case "ALERT_DETAILS":
      return (
        <Text variant="lg">
          {state.isEditMode ? "Edit Alert" : "Create Alert"}
        </Text>
      )
    case "ALERT_FILTERS":
      return <FiltersHeader />
    case "ALERT_CONFIRMATION":
      return <ConfirmationHeader />
    case "ALERT_ARTWORKS":
      return <Text variant="lg">View Artworks</Text>
    default:
      console.warn("no matching case is found in AlertContext")
      return null
  }
}
