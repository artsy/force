import React from "react"
import { Form, FormikProvider, useFormik } from "formik"
import {
  SavedSearchAleftFormValues,
  SavedSearchAlertFormPropsBase,
  SavedSearchAlertMutationResult,
} from "./SavedSearchAlertModel"
import { Box, Button, Checkbox, Input, Text } from "@artsy/palette"
import { getNamePlaceholder } from "./Utils/getNamePlaceholder"

interface SavedSearchAlertFormProps extends SavedSearchAlertFormPropsBase {
  initialValues: SavedSearchAleftFormValues
  onComplete?: (result: SavedSearchAlertMutationResult) => void
}

export const SavedSearchAlertForm: React.FC<SavedSearchAlertFormProps> = ({
  artistId,
  artistName,
  initialValues,
  onComplete,
}) => {
  const formik = useFormik<SavedSearchAleftFormValues>({
    initialValues,
    initialErrors: {},
    onSubmit: values => {},
  })

  const namePlaceholder = getNamePlaceholder(artistName)

  const handleToggleEmailNotification = (enabled: boolean) => {
    formik.setFieldValue("email", enabled)
  }

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          title="name"
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
