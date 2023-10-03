import React, { FC, useEffect, useState } from "react"
import { Formik } from "formik"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Join,
  ModalDialog,
  Separator,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import * as Yup from "yup"
import { createSavedSearchAlert } from "./Mutations/createSavedSearchAlert"
import { createAdvisoryOpportunity } from "./Mutations/createAdvisoryOpportunity"
import { useSystemContext } from "System/useSystemContext"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import createLogger from "Utils/logger"
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "./SavedSearchAlertContext"
import {
  FilterPill,
  HearFromArtsyAdvisorFormValues,
  SavedSearchAlertFormValues,
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
import { useFeatureFlag } from "System/useFeatureFlag"
import { SavedSearchAlertNameInputQueryRenderer } from "Components/SavedSearchAlert/Components/SavedSearchAlertNameInput"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"
import { Environment, fetchQuery, graphql } from "react-relay"
import { SavedSearchAlertModalPhoneQuery } from "__generated__/SavedSearchAlertModalPhoneQuery.graphql"

interface SavedSearchAlertFormProps {
  entity: SavedSearchEntity
  initialValues: SavedSearchAlertFormValues
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

export async function getUserPhoneNumber(
  relayEnvironment: Environment
): Promise<{ phone: string; regionCode: string }> {
  const query = graphql`
    query SavedSearchAlertModalPhoneQuery {
      me {
        phoneNumber {
          regionCode
        }
        phone
      }
    }
  `

  const fetchUserPhoneNumber = () => {
    return fetchQuery<SavedSearchAlertModalPhoneQuery>(
      relayEnvironment,
      query,
      {},
      {
        fetchPolicy: "network-only",
      }
    ).toPromise()
  }

  try {
    const data = await fetchUserPhoneNumber()

    return {
      phone: data?.me?.phone ?? "",
      regionCode: data?.me?.phoneNumber?.regionCode ?? "us",
    }
  } catch (error) {
    return {
      phone: "",
      regionCode: "us",
    }
  }
}

const useUserPhoneNumber = () => {
  const { relayEnvironment } = useSystemContext()

  const [currentPhoneInfo, setCurrentPhoneInfo] = useState<{
    phone: string
    regionCode: string
  }>({ phone: "", regionCode: "" })

  useEffect(() => {
    if (!relayEnvironment) {
      return
    }
    getUserPhoneNumber(relayEnvironment).then(phoneInfo => {
      setCurrentPhoneInfo(phoneInfo)
    })
  }, [relayEnvironment])

  return currentPhoneInfo
}

export const SavedSearchAlertModal: FC<SavedSearchAlertFormProps> = ({
  entity,
  initialValues,
  onClose,
  onCreateAlert,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { pills, criteria, removeCriteriaValue } = useSavedSearchAlertContext()
  const isFallbackToGeneratedAlertNamesEnabled = useFeatureFlag(
    "onyx_force-fallback-to-generated-alert-names"
  )
  const isHearFromArtsyAdvisorEnabled = useFeatureFlag(
    "onyx_advisory-opportunity-in-saved-search"
  )
  const { phone, regionCode } = useUserPhoneNumber()

  const handleRemovePillPress = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    removeCriteriaValue(pill.field as SearchCriteriaAttributeKeys, pill.value)
  }

  const handleSubmit = async (
    values: SavedSearchAlertFormValues & HearFromArtsyAdvisorFormValues
  ) => {
    if (!relayEnvironment) {
      return null
    }

    const userAlertSettings: SavedSearchAlertFormValues = {
      name:
        values.name ||
        (isFallbackToGeneratedAlertNamesEnabled ? "" : entity.placeholder),
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

      if (values.hearFromArtsyAdvisor) {
        await createAdvisoryOpportunity(relayEnvironment, {
          searchCriteriaID: result.id,
          message: values.message,
          phoneNumber: values.phoneNumber,
          phoneCountryCode: values.phoneCountryCode,
        })
      }
      onCreateAlert?.(result)
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <Formik<SavedSearchAlertFormValues & HearFromArtsyAdvisorFormValues>
      initialValues={{
        message: "",
        hearFromArtsyAdvisor: false,
        phoneNumber: phone,
        phoneCountryCode: regionCode,
        ...initialValues,
      }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string()
          .test({
            name: "phone-number-is-valid",
            message: "Please enter a valid phone number",
            test: (national, context) => {
              if (!national || !national.length) {
                return true
              }

              if (!context.parent.hearFromArtsyAdvisor) return true

              return validatePhoneNumber({
                national: `${national}`,
                regionCode: `${context.parent.phoneCountryCode || "US"}`,
              })
            },
          })
          .notRequired(),
        phoneCountryCode: Yup.string().notRequired(),
      })}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        setFieldValue,
        isValid: isPhoneValid,
      }) => {
        // Require one method of contact to be selected
        const hasSelectedContactMethod =
          values.email || values.push || values.hearFromArtsyAdvisor

        return (
          <ModalDialog
            onClose={onClose}
            title="Create Alert"
            data-testid="CreateAlertModal"
            footer={
              <Button
                disabled={!hasSelectedContactMethod || !isPhoneValid}
                loading={isSubmitting}
                onClick={() => handleSubmit()}
                width="100%"
              >
                Save Alert
              </Button>
            }
          >
            <Join separator={<Spacer y={2} />}>
              <SavedSearchAlertNameInputQueryRenderer />
              <Box>
                <Text variant="xs">Filters</Text>
                <Spacer y={2} />
                <Flex flexWrap="wrap" gap={1}>
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

                {values.push && (
                  <>
                    <Spacer y={2} />
                    <FrequenceRadioButtons
                      defaultFrequence={values.frequency}
                      onSelect={selectedOption =>
                        setFieldValue("frequency", selectedOption)
                      }
                    />
                  </>
                )}

                <Spacer y={2} />

                {isHearFromArtsyAdvisorEnabled && (
                  <>
                    <Spacer y={4} />
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="sm-display">
                        Hear from an Artsy Advisor
                      </Text>
                      <Checkbox
                        onSelect={selected => {
                          setFieldValue("hearFromArtsyAdvisor", selected)
                        }}
                        selected={values.hearFromArtsyAdvisor}
                      />
                    </Box>

                    {values.hearFromArtsyAdvisor && (
                      <>
                        <Spacer y={2} />

                        <PhoneNumberInput
                          mt={4}
                          inputProps={{
                            name: "phoneNumber",
                            onBlur: handleBlur,
                            onChange: handleChange,
                            placeholder: "(000) 000 0000",
                            value: values.phoneNumber,
                          }}
                          selectProps={{
                            name: "phoneCountryCode",
                            onBlur: handleBlur,
                            selected: values.phoneCountryCode,
                            onSelect: value => {
                              setFieldValue("phoneCountryCode", value)
                            },
                          }}
                          error={
                            (touched.phoneCountryCode &&
                              errors.phoneCountryCode) ||
                            (touched.phoneNumber && errors.phoneNumber)
                          }
                        />

                        <Spacer y={2} />

                        <TextArea
                          onChange={({ value }) => {
                            setFieldValue("message", value)
                          }}
                          placeholder="Tell us more about what you're looking for."
                          value={values.message}
                        />
                      </>
                    )}
                  </>
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
