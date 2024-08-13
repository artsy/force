import { Formik, FormikHelpers } from "formik"
import createLogger from "Utils/logger"
import { ModalDialog } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { useCreateCollection } from "Apps/CollectorProfile/Routes/Saves/Components/Actions/Mutations/useCreateCollection"
import { FC } from "react"
import { useTracking } from "react-tracking"
import { ActionType, CreatedArtworkList } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  ArtworkListForm,
  ArtworkListFormikValues,
  validationSchema,
} from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListForm/ArtworkListForm"
import {
  ArtworkModalHeaderInfo,
  ArtworkModalHeaderInfoEntity,
} from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkModalHeaderInfo"

export interface ArtworkList {
  internalID: string
  name: string
}

interface CreateNewListModalProps {
  artwork?: ArtworkModalHeaderInfoEntity
  onClose: () => void
  onComplete: (data: ArtworkList) => void
  onBackClick?: () => void
}

export interface CreateNewListModalContainerProps
  extends CreateNewListModalProps {
  visible: boolean
}

const logger = createLogger(
  "CollectorProfile/Routes/Saves/Components/CreateNewListModal"
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
  const cancelMode = onBackClick ? "back" : "dismiss"

  const trackCreatedArtworkList = (artworkListId: string) => {
    const event: CreatedArtworkList = {
      action: ActionType.createdArtworkList,
      context_owner_id: analytics.contextPageOwnerId,
      context_owner_slug: analytics.contextPageOwnerSlug,
      context_owner_type: analytics.contextPageOwnerType,
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
          input: {
            name: values.name.trim(),
            // add shareableWithPartners to the input
            ...{ shareableWithPartners: values.shareableWithPartners },
          },
        },
        rejectIf: response => {
          const result = response.createCollection?.responseOrError
          const error = result?.mutationError

          return error
        },
      })

      const response = createCollection?.responseOrError
      const artworkListId = response?.collection?.internalID

      if (artworkListId) {
        onComplete({
          internalID: artworkListId,
          name: values.name,
        })

        trackCreatedArtworkList(artworkListId)
      }
    } catch (error) {
      logger.error(error)

      // use generic error message by default
      let errorMessage = t("common.errors.somethingWentWrong")

      // if there is a specific error message for the name field, use that instead
      const nameErrorMessage = error?.fieldErrors?.find(
        ({ name }) => name === "name"
      )
      if (nameErrorMessage) {
        errorMessage = nameErrorMessage.message
      }

      helpers.setFieldError("name", errorMessage)
    }
  }

  return (
    <Formik<ArtworkListFormikValues>
      initialValues={{ name: "", shareableWithPartners: true }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => {
        return (
          <ModalDialog
            width={["100%", 713]}
            onClose={onClose}
            title={t("collectorSaves.createNewListModal.title")}
            data-testid="CreateNewList"
            {...(artwork
              ? {
                  header: <ArtworkModalHeaderInfo artwork={artwork} />,
                }
              : {})}
          >
            <ArtworkListForm
              mode="create"
              formik={formik}
              onClose={handleBackOnCancelClick}
              cancelMode={cancelMode}
            />
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
