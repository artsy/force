import React, { FC, useState } from "react"
import { Formik } from "formik"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Join,
  ModalDialog,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { createSavedSearchAlert } from "./Mutations/createSavedSearchAlert"
import { useSystemContext } from "System/useSystemContext"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import createLogger from "Utils/logger"
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "./SavedSearchAlertContext"
import {
  FilterPill,
  SavedSearchAleftFormValues,
  SavedSearchAlertMutationResult,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "./types"
import { SavedSearchAlertPills } from "./Components/SavedSearchAlertPills"
import { Metric } from "Utils/metrics"
import { DEFAULT_FREQUENCY } from "./constants"
import { FrequenceRadioButtons } from "./Components/FrequencyRadioButtons"
import { PriceRangeFilter } from "Components/SavedSearchAlert/Components/PriceRangeFilter"
import { ConfirmationStepModal } from "Components/SavedSearchAlert/ConfirmationStepModal"

interface SavedSearchAlertFormProps {
  entity: SavedSearchEntity
  initialValues: SavedSearchAleftFormValues
  onClose: () => void
  onCreateAlert?: (result: SavedSearchAlertMutationResult) => void
}

export interface SavedSearchAlertFormContainerProps
  extends SavedSearchAlertFormProps {
  visible?: boolean
  criteria: SearchCriteriaAttributes
  metric?: Metric
  aggregations: Aggregations | undefined
  onComplete?: () => void
}

const logger = createLogger("Components/SavedSearchAlert/SavedSearchAlertModal")

export const SavedSearchAlertModal: FC<SavedSearchAlertFormProps> = ({
  entity,
  initialValues,
  onClose,
  onCreateAlert,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { pills, criteria, removeCriteriaValue } = useSavedSearchAlertContext()

  const handleRemovePillPress = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    removeCriteriaValue(pill.field as SearchCriteriaAttributeKeys, pill.value)
  }

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    if (!relayEnvironment) {
      return null
    }

    const userAlertSettings: SavedSearchAleftFormValues = {
      name: values.name || entity.placeholder,
      email: values.email,
      push: values.push,
      frequency: values.push ? values.frequency : DEFAULT_FREQUENCY,
    }

    try {
      const response = await createSavedSearchAlert(
        relayEnvironment,
        userAlertSettings,
        criteria
      )
      const result = {
        id: response.createSavedSearch?.savedSearchOrErrors.internalID!,
      }
      onCreateAlert?.(result)
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <Formik<SavedSearchAleftFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        const isSaveAlertButtonDisabled = !values.email && !values.push

        return (
          <ModalDialog
            onClose={onClose}
            title="Create Alert"
            data-testid="CreateAlertModal"
            footer={
              <Button
                disabled={isSaveAlertButtonDisabled}
                loading={isSubmitting}
                onClick={() => handleSubmit()}
                width="100%"
              >
                Save Alert
              </Button>
            }
          >
            <Join separator={<Spacer y={2} />}>
              <Input
                title="Alert Name"
                name="name"
                placeholder={entity.placeholder}
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                maxLength={75}
              />

              <Box>
                <Text variant="xs">Filters</Text>
                <Spacer y={2} />
                <Flex flexWrap="wrap" mx={-0.5}>
                  <SavedSearchAlertPills
                    items={pills}
                    onDeletePress={handleRemovePillPress}
                  />
                </Flex>

                <Separator my={1} />

                <PriceRangeFilter />

                <Separator my={2} />
              </Box>

              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Email Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("email", selected)}
                    selected={values.email}
                  />
                </Box>
                <Spacer y={4} />
                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Mobile Alerts</Text>
                  <Checkbox
                    onSelect={selected => {
                      setFieldValue("push", selected)

                      // Restore default frequency when "Mobile Alerts" is unselected
                      if (!selected) {
                        setFieldValue("frequency", DEFAULT_FREQUENCY)
                      }
                    }}
                    selected={values.push}
                  />
                </Box>

                <Spacer y={2} />

                {values.push && (
                  <FrequenceRadioButtons
                    defaultFrequence={values.frequency}
                    onSelect={selectedOption =>
                      setFieldValue("frequency", selectedOption)
                    }
                  />
                )}
              </Box>
            </Join>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const SavedSearchAlertModalContainer: React.FC<SavedSearchAlertFormContainerProps> = props => {
  const {
    visible,
    entity,
    criteria,
    metric,
    aggregations,
    onCreateAlert,
    onComplete,
  } = props

  const [searchCriteriaId, setSearchCriteriaId] = useState("")
  const [step, setStep] = useState<"CREATE_ALERT" | "CONFIRMATION">(
    "CREATE_ALERT"
  )

  const handleCreateAlert = (result: SavedSearchAlertMutationResult) => {
    setSearchCriteriaId(result.id)
    onCreateAlert?.(result)
    setStep("CONFIRMATION")
  }

  const handleComplete = () => {
    onComplete?.()
    setStep("CREATE_ALERT")
  }

  if (!visible) return null

  switch (step) {
    case "CREATE_ALERT":
      return (
        <SavedSearchAlertContextProvider
          criteria={criteria}
          aggregations={aggregations}
          entity={entity}
          metric={metric}
        >
          <SavedSearchAlertModal {...props} onCreateAlert={handleCreateAlert} />
        </SavedSearchAlertContextProvider>
      )
    case "CONFIRMATION":
      return (
        <SavedSearchAlertContextProvider
          criteria={criteria}
          aggregations={aggregations}
          entity={entity}
          metric={metric}
        >
          <ConfirmationStepModal
            onClose={handleComplete}
            searchCriteriaId={searchCriteriaId}
          />
        </SavedSearchAlertContextProvider>
      )
  }
}
