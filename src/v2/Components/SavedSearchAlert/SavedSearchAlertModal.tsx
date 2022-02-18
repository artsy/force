import React from "react"
import { Formik } from "formik"
import {
  SavedSearchAleftFormValues,
  SavedSearchAlertMutationResult,
} from "./SavedSearchAlertModel"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Join,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import { getNamePlaceholder } from "./Utils/getNamePlaceholder"
import { getSearchCriteriaFromFilters } from "../ArtworkFilter/SavedSearch/Utils"
import { createSavedSearchAlert } from "./Mutations/createSavedSearchAlert"
import { useSystemContext } from "v2/System"
import { useArtworkFilterContext } from "../ArtworkFilter/ArtworkFilterContext"
import createLogger from "v2/Utils/logger"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
} from "../ArtworkFilter/SavedSearch/types"
import { Pills } from "../ArtworkFilter/SavedSearch/Components/Pills"
import { DownloadAppBanner } from "./DownloadAppBanner"
import {
  SavedSearchContextProvider,
  useSavedSearchContext,
} from "../ArtworkFilter/SavedSearch/Utils/SavedSearchContext"

interface SavedSearchAlertFormProps {
  entity: SavedSearchEntity
  initialValues: SavedSearchAleftFormValues
  onClose: () => void
  onComplete?: (result: SavedSearchAlertMutationResult) => void
}

export interface SavedSearchAlertFormContainerProps
  extends SavedSearchAlertFormProps {
  visible?: boolean
}

const logger = createLogger(
  "v2/Components/SavedSearchAlert/SavedSearchAlertModal"
)

export const SavedSearchAlertModal: React.FC<SavedSearchAlertFormProps> = ({
  entity,
  initialValues,
  onClose,
  onComplete,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { pills, criteria, removeCriteriaValue } = useSavedSearchContext()
  const namePlaceholder = getNamePlaceholder(entity.name, pills)

  const handleRemovePillPress = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    removeCriteriaValue(
      pill.filterName as SearchCriteriaAttributeKeys,
      pill.name
    )
  }

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    if (!relayEnvironment) {
      return null
    }

    const alertName = values.name || namePlaceholder

    const userAlertSettings: SavedSearchAleftFormValues = {
      name: alertName,
      email: values.email,
      push: values.push,
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
      onComplete?.(result)
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
            <Join separator={<Spacer mt={4} />}>
              <Input
                title="Alert Name"
                name="name"
                placeholder={namePlaceholder}
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                maxLength={75}
              />

              <Box>
                <Text variant="xs" textTransform="uppercase">
                  Filters
                </Text>
                <Spacer mt={2} />
                <Flex flexWrap="wrap" mx={-0.5}>
                  <Pills items={pills} onDeletePress={handleRemovePillPress} />
                </Flex>
              </Box>

              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text variant="md">Email Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("email", selected)}
                    selected={values.email}
                  />
                </Box>
                <Spacer mt={4} />
                <Box display="flex" justifyContent="space-between">
                  <Text variant="md">Mobile Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("push", selected)}
                    selected={values.push}
                  />
                </Box>
              </Box>

              <DownloadAppBanner entity={entity} />
            </Join>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const SavedSearchAlertModalContainer: React.FC<SavedSearchAlertFormContainerProps> = props => {
  const { visible, entity } = props
  const { aggregations, filters } = useArtworkFilterContext()

  if (visible) {
    const criteria = getSearchCriteriaFromFilters(entity.id, filters ?? {})

    return (
      <SavedSearchContextProvider
        criteria={criteria}
        aggregations={aggregations}
        entity={entity}
      >
        <SavedSearchAlertModal {...props} />
      </SavedSearchContextProvider>
    )
  }

  return null
}
