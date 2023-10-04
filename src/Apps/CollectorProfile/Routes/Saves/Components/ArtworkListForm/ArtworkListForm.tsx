import { Form, FormikProps } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import { LabeledInput, Spacer, Text, Flex, Button } from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import i18n from "System/i18n/i18n"

export interface ArtworkListFormikValues {
  name: string
}

export const MAX_NAME_LENGTH = 40

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t("collectorSaves.artworkListForm.fields.name.required"))
    .matches(/\S+/, {
      message: i18n.t("collectorSaves.artworkListForm.fields.name.nonempty"),
    })
    .max(MAX_NAME_LENGTH),
})

interface ArtworkListFormProps {
  /** The bag of Formik props to be used by the form */
  formik: FormikProps<ArtworkListFormikValues>

  /** Is this form being used to create or edit an artwork list? */
  mode: "create" | "edit"

  /** Handler for the Cancel button */
  onClose: () => void

  /** Does the handler for the Cancel button simply dismiss, or navigate back to the previous step? */
  cancelMode?: "dismiss" | "back"
}

export const ArtworkListForm: React.FC<ArtworkListFormProps> = props => {
  const { formik, mode, onClose, cancelMode } = props
  const { t } = useTranslation()

  return (
    <Form>
      <LabeledInput
        name="name"
        value={formik.values.name}
        title={
          mode === "create"
            ? t("collectorSaves.artworkListForm.fields.name.label.create")
            : t("collectorSaves.artworkListForm.fields.name.label.edit")
        }
        placeholder={t(
          "collectorSaves.artworkListForm.fields.name.placeholder"
        )}
        label={<EditIcon display={["none", "block"]} />}
        error={formik.touched.name && formik.errors.name}
        maxLength={MAX_NAME_LENGTH}
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <Spacer y={1} />

      <Text variant="xs">
        {t(
          "collectorSaves.artworkListForm.fields.name.remainingCharactersCount",
          {
            count: MAX_NAME_LENGTH - formik.values.name.length,
          }
        )}
      </Text>

      <Spacer y={2} />

      <Flex
        justifyContent={["flex-start", "space-between"]}
        flexDirection={["column", "row-reverse"]}
      >
        <Button
          type="submit"
          loading={!!formik.isSubmitting}
          disabled={!formik.dirty || !formik.isValid}
        >
          {mode === "create"
            ? t("collectorSaves.artworkListForm.buttons.create")
            : t("collectorSaves.artworkListForm.buttons.edit")}
        </Button>

        <Spacer y={[1, 0]} />

        <Button variant="secondaryBlack" onClick={onClose}>
          {cancelMode === "back"
            ? t("common.buttons.back")
            : t("common.buttons.cancel")}
        </Button>
      </Flex>
    </Form>
  )
}
