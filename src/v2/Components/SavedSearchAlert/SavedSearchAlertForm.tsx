import React from "react"
import { Form, FormikProvider, useFormik } from "formik"
import {
  SavedSearchAleftFormValues,
  SavedSearchAlertMutationResult,
} from "./SavedSearchAlertModel"
import { Box, Button, Checkbox, Input, Text } from "@artsy/palette"
import { getNamePlaceholder } from "./Utils/getNamePlaceholder"
import { getSearchCriteriaFromFilters } from "../ArtworkFilter/SavedSearch/Utils"
import { createSavedSearchAlert } from "./Mutations/createSavedSearchAlert"
import { useSystemContext } from "v2/System"
import { extractPills } from "./Utils/extractPills"
import { useArtworkFilterContext } from "../ArtworkFilter/ArtworkFilterContext"
import createLogger from "v2/Utils/logger"
import { SavedSearchAttributes } from "../ArtworkFilter/SavedSearch/types"

interface SavedSearchAlertFormProps {
  savedSearchAttributes: SavedSearchAttributes
  initialValues: SavedSearchAleftFormValues
  onComplete?: (result: SavedSearchAlertMutationResult) => void
}

const logger = createLogger(
  "v2/Components/SavedSearchAlert/SavedSearchAlertForm"
)

export const SavedSearchAlertForm: React.FC<SavedSearchAlertFormProps> = ({
  savedSearchAttributes,
  initialValues,
  onComplete,
}) => {
  const { id, name } = savedSearchAttributes
  const { relayEnvironment } = useSystemContext()
  const filterContext = useArtworkFilterContext()

  const filters = filterContext.currentlySelectedFilters?.() || {}

  const pills = extractPills(filters, filterContext.aggregations!)
  const namePlaceholder = getNamePlaceholder(name, pills.length)

  const formik = useFormik<SavedSearchAleftFormValues>({
    initialValues,
    initialErrors: {},
    onSubmit: async values => {
      if (!relayEnvironment) {
        return null
      }

      const alertName = values.name || namePlaceholder

      const userAlertSettings: SavedSearchAleftFormValues = {
        name: alertName,
        email: values.email,
      }

      try {
        const criteria = getSearchCriteriaFromFilters(id, filters)
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
    },
  })

  const handleToggleEmailNotification = (enabled: boolean) => {
    formik.setFieldValue("email", enabled)
  }

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          title="Name"
          name="name"
          placeholder={namePlaceholder}
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          error={formik.errors.name}
          maxLength={75}
        />
        <Box display="flex" justifyContent="space-between" my={4}>
          <Text>Email Alerts</Text>
          <Checkbox
            onSelect={handleToggleEmailNotification}
            selected={formik.values.email}
          />
        </Box>
        <Button type="submit" loading={formik.isSubmitting} width="100%" mt={4}>
          Save Alert
        </Button>
      </Form>
    </FormikProvider>
  )
}
