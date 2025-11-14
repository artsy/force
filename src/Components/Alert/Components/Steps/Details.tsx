import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { SugggestedFiltersQueryRenderer } from "Components/Alert/Components/Form/SuggestedFilters"
import { NotificationPreferencesQueryRenderer } from "Components/Alert/Components/NotificationPreferences"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import { FadeInBox } from "Components/FadeInBox"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import type { SavedSearchFrequency } from "Components/SavedSearchAlert/types"
import { Box, Button, Flex, Join, Spacer, Text } from "@artsy/palette"
import { Formik } from "formik"
import type { FC } from "react"

export interface AlertFormikValues {
  name: string
  push: boolean
  email: boolean
  details: string
  frequency?: SavedSearchFrequency
}

export const Details: FC<React.PropsWithChildren<unknown>> = () => {
  const { clickedAddFilters } = useAlertTracking()

  const { onComplete, dispatch, goToFilters, state, createAlertError } =
    useAlertContext()

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={onComplete}
    >
      {({ isSubmitting, values, handleSubmit }) => {
        const transitionToFiltersAndTrack = () => {
          dispatch({ type: "SET_SETTINGS", payload: values })
          goToFilters()
          clickedAddFilters()
        }

        return (
          <FadeInBox maxWidth={[null, 500]}>
            <Flex flexDirection="column" p={2}>
              <Join separator={<Spacer y={4} />}>
                <Box>
                  <Text variant="sm-display" mb={1}>
                    We'll send you alerts for
                  </Text>
                  <Flex flexWrap="wrap" gap={1}>
                    <CriteriaPills />
                  </Flex>
                </Box>
                <SugggestedFiltersQueryRenderer
                  transitionToFiltersAndTrack={transitionToFiltersAndTrack}
                />
                <DetailsInput />
                <NotificationPreferencesQueryRenderer mode="create" />
              </Join>
            </Flex>

            <Box position="sticky" bottom={0} bg="mono0" p={2}>
              {!!createAlertError && (
                <Text mb={1} color="red100" variant="xs">
                  {createAlertError}
                </Text>
              )}
              <Button
                data-testid="submitCreateAlert"
                loading={isSubmitting}
                onClick={() => {
                  dispatch({ type: "SET_SETTINGS", payload: values })
                  handleSubmit()
                }}
                width="100%"
              >
                Create Alert
              </Button>
            </Box>
          </FadeInBox>
        )
      }}
    </Formik>
  )
}
