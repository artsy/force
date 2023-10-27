import { Box, Button, Text } from "@artsy/palette"
import { useCreateAlertFadeTransition } from "Components/SavedSearchAlert/Components/CreateAlertModalTransition"
import { FiltersSavedSearchAlertModal } from "Components/SavedSearchAlert/FiltersSavedSearchAlertModal"
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
  const { register, loading, handleNext } = useCreateAlertFadeTransition({
    next: () => {},
  })
  // Create Alert header
  // Close icon on right
  // Form
  // > Add filters CTA
  // Create alert button

  return (
    <>
      <Text p={2} variant="lg">
        Create Alert
      </Text>
      <Box ref={register(0)}>
        <FiltersSavedSearchAlertModal
          onCreateAlert={result => {
            // console.log("onCreateAlert")
            onSubmit(result.id)
            handleNext()
          }}
          initialValues={{
            name: "",
            email: true,
            push: true,
            details: "",
            frequency: DEFAULT_FREQUENCY,
          }}
          entity={entity}
          onClose={() => {}}
        />
      </Box>
    </>
  )
}
