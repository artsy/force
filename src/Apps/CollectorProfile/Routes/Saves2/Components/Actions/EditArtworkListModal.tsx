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
import { useUpdateArtworkList } from "./Mutations/useUpdateArtworkList"
import createLogger from "Utils/logger"
import { useTracking } from "react-tracking"
import { ActionType, EditedArtworkList, OwnerType } from "@artsy/cohesion"

export interface EditArtworkListEntity {
  internalID: string
  name: string
}

interface EditArtworkListModalProps {
  artworkList: EditArtworkListEntity
  onClose: () => void
}

interface FormikValues {
  name: string
}

const MAX_NAME_LENGTH = 40

const logger = createLogger("EditArtworkListModal")

export const EditArtworkListModal: React.FC<EditArtworkListModalProps> = ({
  artworkList,
  onClose,
}) => {
  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  const initialValues: FormikValues = {
    name: artworkList.name,
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("collectorSaves.editListModal.fields.name.required")) // TODO: confirm copy
      .max(MAX_NAME_LENGTH),
  })

  const { submitMutation } = useUpdateArtworkList()

  const { sendToast } = useToasts()

  const trackAnalyticEvent = () => {
    const event: EditedArtworkList = {
      action: ActionType.editedArtworkList,
      context_owner_type: OwnerType.saves,
      owner_id: artworkList.internalID,
    }

    trackEvent(event)
  }

  const handleSubmit = async (formikValues: FormikValues) => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: artworkList.internalID,
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

      trackAnalyticEvent()
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
