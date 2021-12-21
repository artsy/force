import React, { useEffect, useState } from "react"
import { Form, FormikProvider, useFormik } from "formik"
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
  Modal,
  Spacer,
  Text,
} from "@artsy/palette"
import { getNamePlaceholder } from "./Utils/getNamePlaceholder"
import { getSearchCriteriaFromFilters } from "../ArtworkFilter/SavedSearch/Utils"
import { createSavedSearchAlert } from "./Mutations/createSavedSearchAlert"
import { useSystemContext } from "v2/System"
import {
  useArtworkFilterContext,
  initialArtworkFilterState,
} from "../ArtworkFilter/ArtworkFilterContext"
import createLogger from "v2/Utils/logger"
import { SavedSearchAttributes } from "../ArtworkFilter/SavedSearch/types"
import { FilterPill } from "../ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { extractPills } from "./Utils/extractPills"
import { Pills } from "../ArtworkFilter/SavedSearch/Components/Pills"

interface SavedSearchAlertFormProps {
  savedSearchAttributes: SavedSearchAttributes
  initialValues: SavedSearchAleftFormValues
  visible?: boolean
  onClose: () => void
  onComplete?: (result: SavedSearchAlertMutationResult) => void
}

const logger = createLogger(
  "v2/Components/SavedSearchAlert/SavedSearchAlertModal"
)

export const SavedSearchAlertModal: React.FC<SavedSearchAlertFormProps> = ({
  savedSearchAttributes,
  initialValues,
  visible,
  onClose,
  onComplete,
}) => {
  const { id, name } = savedSearchAttributes
  const { relayEnvironment } = useSystemContext()
  const filterContext = useArtworkFilterContext()
  const filtersFromContext = filterContext.currentlySelectedFilters!()
  const [filters, setFilters] = useState(filtersFromContext)
  const pills = extractPills(
    filters,
    filterContext.aggregations,
    savedSearchAttributes
  )
  const namePlaceholder = getNamePlaceholder(name, pills.length)

  useEffect(() => {
    setFilters(filtersFromContext)
  }, [visible])

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
        push: values.push,
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

  const isSaveAlertButtonDisabled = !formik.values.email && !formik.values.push

  const handleToggleNotification = (name: "email" | "push") => (
    enabled: boolean
  ) => {
    formik.setFieldValue(name, enabled)
  }

  const handleRemovePillPress = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = filters[pill.filterName]

    if (Array.isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.name)
    } else {
      filterValue = initialArtworkFilterState[pill.filterName]
    }

    setFilters({
      ...filters,
      [pill.filterName]: filterValue,
    })
  }

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit} role="form">
        <Modal
          show={visible}
          onClose={onClose}
          title="Create an Alert"
          FixedButton={
            <Button
              type="submit"
              disabled={isSaveAlertButtonDisabled}
              loading={formik.isSubmitting}
              width="100%"
            >
              Save Alert
            </Button>
          }
        >
          <Join separator={<Spacer mt={4} />}>
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
                <Text>Email Alerts</Text>
                <Checkbox
                  onSelect={handleToggleNotification("email")}
                  selected={formik.values.email}
                />
              </Box>
              <Spacer mt={4} />
              <Box display="flex" justifyContent="space-between">
                <Text>Mobile Alerts</Text>
                <Checkbox
                  onSelect={handleToggleNotification("push")}
                  selected={formik.values.push}
                />
              </Box>
            </Box>
          </Join>
        </Modal>
      </Form>
    </FormikProvider>
  )
}
