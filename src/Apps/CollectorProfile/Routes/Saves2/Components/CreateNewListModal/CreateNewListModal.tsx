import { Formik, FormikHelpers } from "formik"
import createLogger from "Utils/logger"
import {
  Flex,
  Button,
  LabeledInput,
  ModalDialog,
  Spacer,
  EditIcon,
  Text,
} from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { Media } from "Utils/Responsive"
import { useTranslation } from "react-i18next"
import {
  ArtworkEntity,
  CreateNewListModalHeader,
} from "./CreateNewListModalHeader"
import { useCreateCollection } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/Mutations/useCreateCollection"

export interface CreateNewListValues {
  name: string
}

export interface NewAddedList {
  id: string
  name: string
}

interface CreateNewListModalProps {
  artwork?: ArtworkEntity
  onClose: () => void
  onComplete: (data: NewAddedList) => void
  onBackClick?: () => void
}

export interface CreateNewListModalContainerProps
  extends CreateNewListModalProps {
  visible: boolean
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
)

const MAX_NAME_LENGTH = 40

export const CreateNewListModal: React.FC<CreateNewListModalProps> = ({
  artwork,
  onClose,
  onComplete,
  onBackClick,
}) => {
  const { t } = useTranslation()
  const { relayEnvironment } = useSystemContext()
  const { submitMutation } = useCreateCollection()

  const handleBackOnCancelClick = onBackClick ?? onClose
  const backOrCancelLabel = onBackClick
    ? t("common.buttons.back")
    : t("common.buttons.cancel")

  const handleSubmit = async (
    values: CreateNewListValues,
    helpers: FormikHelpers<CreateNewListValues>
  ) => {
    if (!relayEnvironment) {
      return null
    }

    try {
      const { createCollection } = await submitMutation({
        variables: {
          input: { name: values.name },
        },
        rejectIf: response => {
          const result = response.createCollection?.responseOrError
          const errorMessage = result?.mutationError?.message

          return !!errorMessage
        },
      })

      onComplete({
        id: createCollection?.responseOrError?.collection?.internalID!,
        name: values.name,
      })
    } catch (error) {
      logger.error(error)
      helpers.setFieldError(
        "name",
        error.message ?? t("common.errors.somethingWentWrong")
      )
    }
  }

  return (
    <Formik<CreateNewListValues>
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => {
        const isCreateButtonDisabled = !values.name

        return (
          <ModalDialog
            width={["100%", 713]}
            onClose={onClose}
            title={t("collectorSaves.createNewListModal.title")}
            data-testid="CreateNewList"
            header={
              artwork ? <CreateNewListModalHeader artwork={artwork} /> : null
            }
            footer={
              <>
                {/* Desktop view */}
                <Media greaterThanOrEqual="sm">
                  <Flex justifyContent="space-between">
                    <Button
                      variant="secondaryBlack"
                      onClick={handleBackOnCancelClick}
                    >
                      {backOrCancelLabel}
                    </Button>

                    <Button
                      disabled={isCreateButtonDisabled}
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                      alignSelf="flex-end"
                    >
                      {t("collectorSaves.createNewListModal.createListButton")}
                    </Button>
                  </Flex>
                </Media>

                {/* Mobile view */}
                <Media lessThan="sm">
                  <Button
                    disabled={isCreateButtonDisabled}
                    loading={isSubmitting}
                    onClick={() => handleSubmit()}
                    width="100%"
                  >
                    {t("collectorSaves.createNewListModal.createListButton")}
                  </Button>

                  <Spacer y={1} />

                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    onClick={handleBackOnCancelClick}
                  >
                    {backOrCancelLabel}
                  </Button>
                </Media>
              </>
            }
          >
            <LabeledInput
              title={t("collectorSaves.createNewListModal.nameLabel")}
              name="name"
              placeholder={t(
                "collectorSaves.createNewListModal.namePlaceholder"
              )}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              maxLength={MAX_NAME_LENGTH}
              label={
                <>
                  {/* Desktop view */}
                  <Media greaterThanOrEqual="sm">
                    <EditIcon />
                  </Media>
                </>
              }
            />
            <Spacer y={1} />
            <Text variant="xs">
              {t("collectorSaves.createNewListModal.remainingCharactersCount", {
                count: MAX_NAME_LENGTH - values.name.length,
              })}
            </Text>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const CreateNewListModalContainer: React.FC<CreateNewListModalContainerProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <CreateNewListModal {...props} />
}
