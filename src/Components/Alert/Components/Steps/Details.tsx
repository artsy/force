import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { Formik } from "formik"
import { FC } from "react"

import { AlertNameInputQueryRenderer } from "Components/Alert/Components/Form/AlertNameInput"
import { CriteriaPillsQueryRenderer } from "Components/Alert/Components/CriteriaPills"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import { PriceRangeFilter } from "Components/Alert/Components/Form/PriceRange"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useFeatureFlag } from "System/useFeatureFlag"

export interface AlertFormikValues {
  name: string
  push: boolean
  email: boolean
  details: string
}

export const Details: FC = () => {
  const { onComplete, dispatch, goToFilters, state } = useAlertContext()

  const newAlertModalFilteresEnabled = useFeatureFlag(
    "onyx_artwork_alert_modal_v2_filters"
  )

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={onComplete}
    >
      {({ isSubmitting, values, setFieldValue, handleSubmit }) => {
        const transitionToFilters = () => {
          dispatch({ type: "SET_SETTINGS", payload: values })
          goToFilters()
        }

        return (
          <Flex flexDirection="column" p={2}>
            <Join separator={<Spacer y={4} />}>
              <Text variant="lg">Create Alert</Text>

              <AlertNameInputQueryRenderer />

              <Box>
                <Text variant="sm-display" mb={1}>
                  Filters
                </Text>
                <Flex flexWrap="wrap" gap={1}>
                  <CriteriaPillsQueryRenderer />
                </Flex>
              </Box>

              {newAlertModalFilteresEnabled ? (
                <Clickable onClick={transitionToFilters} width="100%">
                  <Text variant="sm-display">Add Filters</Text>

                  <Flex justifyContent="space-between">
                    <Text variant="sm-display" color="black60">
                      Including Price Range, Rarity, Medium, Size, Color
                    </Text>
                    <ChevronRightIcon />
                  </Flex>
                </Clickable>
              ) : (
                <PriceRangeFilter expanded={false} />
              )}

              <DetailsInput />

              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Email Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("email", selected)}
                    selected={values.email}
                  />
                </Box>

                <Spacer y={2} />

                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Mobile Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("push", selected)}
                    selected={values.push}
                  />
                </Box>
              </Box>

              <Button
                loading={isSubmitting}
                onClick={() => {
                  dispatch({ type: "SET_SETTINGS", payload: values })
                  handleSubmit()
                }}
                width="100%"
              >
                Save Alert
              </Button>
            </Join>
          </Flex>
        )
      }}
    </Formik>
  )
}
