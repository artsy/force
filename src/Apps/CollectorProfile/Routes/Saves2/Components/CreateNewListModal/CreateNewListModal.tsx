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
import { Media } from "Utils/Responsive"
import { useTranslation } from "react-i18next"
import {
  ArtworkEntity,
  CreateNewListModalHeader,
} from "./CreateNewListModalHeader"
import { useCreateCollection } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/Mutations/useCreateCollection"
import { FC } from "react"
import { useTracking } from "react-tracking"
import { ActionType, CreatedArtworkList } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import {
  ArtworkListFormikValues,
  MAX_NAME_LENGTH,
} from "Apps/CollectorProfile/Routes/Saves2/Components/ArtworkListForm/ArtworkListForm"

export interface ArtworkList {
  internalID: string
  name: string
}

interface CreateNewListModalProps {
  artwork?: ArtworkEntity
  onClose: () => void
  onComplete: (data: ArtworkList) => void
  onBackClick?: () => void
}

export interface CreateNewListModalContainerProps
  extends CreateNewListModalProps {
  visible: boolean
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
)

export const CreateNewListModal: React.FC<CreateNewListModalProps> = ({
  artwork,
  onClose,
  onComplete,
  onBackClick,
}) => {
  const { t } = useTranslation()
  const { submitMutation } = useCreateCollection()
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()

  const handleBackOnCancelClick = onBackClick ?? onClose
  const backOrCancelLabel = onBackClick
    ? t("common.buttons.back")
    : t("common.buttons.cancel")

  const trackAnalyticEvent = (artworkListId: string) => {
    const event: CreatedArtworkList = {
      action: ActionType.createdArtworkList,
      context_owner_id: analytics.contextPageOwnerId,
      context_owner_slug: analytics.contextPageOwnerSlug,
      context_owner_type: analytics.contextPageOwnerType!,
      owner_id: artworkListId,
    }

    trackEvent(event)
  }

  const handleSubmit = async (
    values: ArtworkListFormikValues,
    helpers: FormikHelpers<ArtworkListFormikValues>
  ) => {
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

      const response = createCollection?.responseOrError
      const artworkListId = response?.collection?.internalID!

      onComplete({
        internalID: artworkListId,
        name: values.name,
      })

      trackAnalyticEvent(artworkListId)
    } catch (error) {
      logger.error(error)
      helpers.setFieldError(
        "name",
        error.message ?? t("common.errors.somethingWentWrong")
      )
    }
  }

  return (
    <Formik<ArtworkListFormikValues>
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
              <Flex
                justifyContent={["flex-start", "space-between"]}
                flexDirection={["column", "row-reverse"]}
              >
                <Button
                  disabled={isCreateButtonDisabled}
                  loading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  {t("collectorSaves.createNewListModal.createListButton")}
                </Button>

                <Spacer y={[1, 0]} />

                <Button
                  variant="secondaryBlack"
                  onClick={handleBackOnCancelClick}
                >
                  {backOrCancelLabel}
                </Button>
              </Flex>
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

export const CreateNewListModalContainer: FC<CreateNewListModalContainerProps> = props => {
  const { visible } = props

  if (!visible) return null

  return <CreateNewListModal {...props} />
}
