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
    .required(i18n.t("collectorSaves.editListModal.fields.name.required"))
    .max(MAX_NAME_LENGTH),
})

interface ArtworkListFormProps {
  formik: FormikProps<ArtworkListFormikValues>
  onClose: () => void
}

export const ArtworkListForm: React.FC<ArtworkListFormProps> = props => {
  const { formik, onClose } = props
  const { t } = useTranslation()

  return (
    <Form>
      <LabeledInput
        name="name"
        value={formik.values.name}
        title={t("collectorSaves.editListModal.fields.name.label")}
        label={<EditIcon />}
        error={formik.touched.name && formik.errors.name}
        maxLength={MAX_NAME_LENGTH}
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <Spacer y={1} />

      <Text variant="xs">
        {t("collectorSaves.createNewListModal.remainingCharactersCount", {
          count: MAX_NAME_LENGTH - formik.values.name.length,
        })}
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
          {t("collectorSaves.editListModal.save")}
        </Button>

        <Spacer y={[1, 0]} />

        <Button variant="secondaryBlack" onClick={onClose}>
          {t("common.buttons.cancel")}
        </Button>
      </Flex>
    </Form>
  )
}
