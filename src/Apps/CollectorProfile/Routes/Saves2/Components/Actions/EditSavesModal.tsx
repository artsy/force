import {
  Button,
  Flex,
  LabeledInput,
  ModalDialog,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useUpdateCollection } from "./Mutations/useUpdateCollection"
import createLogger from "Utils/logger"

export interface EditSavesModalCollection {
  internalID: string
  name: string
}

interface EditSavesModalProps {
  collection: EditSavesModalCollection
  onClose: () => void
}

interface FormikValues {
  name: string
}

const MAX_NAME_LENGTH = 40

const logger = createLogger("EditSavesModal")

export const EditSavesModal: React.FC<EditSavesModalProps> = ({
  collection,
  onClose,
}) => {
  const { t } = useTranslation()

  const initialValues: FormikValues = {
    name: collection.name,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("collectorSaves.editListModal.fields.name.required")) // TODO: confirm copy
      .max(MAX_NAME_LENGTH),
  })

  const { submitMutation } = useUpdateCollection()

  const { sendToast } = useToasts()

  const handleSubmit = async (formikValues: FormikValues) => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: collection.internalID,
            name: formikValues.name.trim(),
          },
        },
        rejectIf: res => {
          const result = res.updateCollection?.responseOrError

          return result?.__typename === "UpdateCollectionFailure"
            ? result.mutationError
            : false
        },
      })

      sendToast({
        variant: "success",
        message: t("collectorSaves.editListModal.success"),
      })
    } catch (error) {
      logger.error(error)
      sendToast({
        variant: "error",
        message: error.message ?? t("common.errors.somethingWentWrong"),
      })
    } finally {
      onClose()
    }
  }

  return (
    <Formik<FormikValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleBlur,
        handleChange,
        isSubmitting,
        isValid,
      }) => {
        return (
          <ModalDialog
            title={t("collectorSaves.editListModal.title")}
            onClose={onClose}
            width={["100%", 700]}
          >
            <Form /* TODO: confirm implicit form submission */>
              <LabeledInput
                name="name"
                value={values.name}
                title={t("collectorSaves.editListModal.fields.name.label")}
                label={<EditIcon />}
                error={touched.name && errors.name}
                maxLength={MAX_NAME_LENGTH}
                required // TODO: confirm
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Spacer y={1} />
              <Text variant="xs">
                {t(
                  "collectorSaves.createNewListModal.remainingCharactersCount",
                  { count: MAX_NAME_LENGTH - values.name.length }
                )}
              </Text>
              <Spacer y={2} />
              <Flex
                justifyContent={["flex-start", "space-between"]}
                flexDirection={["column", "row-reverse"]}
              >
                <Button
                  type="submit"
                  loading={!!isSubmitting}
                  disabled={!dirty || !isValid}
                >
                  {t("collectorSaves.editListModal.save")}
                </Button>

                <Spacer y={[1, 0]} />

                <Button variant="secondaryBlack" onClick={onClose}>
                  {t("common.buttons.cancel")}
                </Button>
              </Flex>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}
