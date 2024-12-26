import { ModalDialog, useToasts } from "@artsy/palette"

import { ActionType, type EditedArtworkList, OwnerType } from "@artsy/cohesion"
import {
  ArtworkListForm,
  type ArtworkListFormikValues,
  validationSchema,
} from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListForm/ArtworkListForm"
import createLogger from "Utils/logger"
import { Formik, type FormikHelpers } from "formik"
import { useTracking } from "react-tracking"
import { useUpdateArtworkList } from "./Mutations/useUpdateArtworkList"

export interface EditArtworkListEntity {
  internalID: string
  name: string
  shareableWithPartners: boolean
}

interface EditArtworkListModalProps {
  artworkList: EditArtworkListEntity
  onClose: () => void
}

const logger = createLogger("EditArtworkListModal")

export const EditArtworkListModal: React.FC<
  React.PropsWithChildren<EditArtworkListModalProps>
> = ({ artworkList, onClose }) => {
  const { trackEvent } = useTracking()

  const initialValues: ArtworkListFormikValues = {
    name: artworkList.name,
    shareableWithPartners: artworkList.shareableWithPartners,
  }

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

  const handleSubmit = async (
    formikValues: ArtworkListFormikValues,
    helpers: FormikHelpers<ArtworkListFormikValues>,
  ) => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: artworkList.internalID,
            name: formikValues.name.trim(),
            shareableWithPartners: formikValues.shareableWithPartners,
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
        message: "Changes saved",
      })

      trackAnalyticEvent()
      onClose()
    } catch (error) {
      logger.error(error)

      // use generic error message by default
      let errorMessage = "Something went wrong. Please try again."

      // if there is a specific error message for the name field, use that instead
      const nameErrorMessage = error?.fieldErrors?.find(
        ({ name }) => name === "name",
      )
      if (nameErrorMessage) {
        errorMessage = nameErrorMessage.message
      }

      helpers.setFieldError("name", errorMessage)
    }
  }

  return (
    <Formik<ArtworkListFormikValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {formik => {
        return (
          <ModalDialog
            title="Edit your list"
            onClose={onClose}
            width={["100%", 700]}
          >
            <ArtworkListForm mode="edit" formik={formik} onClose={onClose} />
          </ModalDialog>
        )
      }}
    </Formik>
  )
}
