import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { useRouter } from "System/Hooks/useRouter"

import { ActionType, type DeletedArtworkList, OwnerType } from "@artsy/cohesion"
import { Button, Flex, ModalDialog, Text, useToasts } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { useDeleteArtworkList } from "./Mutations/useDeleteArtworkList"

export interface DeleteArtworkListEntity {
  internalID: string
  name: string
}

interface Props {
  artworkList: DeleteArtworkListEntity
  onClose: () => void
}

export const DeleteArtworkListModal: React.FC<
  React.PropsWithChildren<Props>
> = ({ artworkList, onClose }) => {
  const { router } = useRouter()
  const { trackEvent } = useTracking()

  const { submitMutation } = useDeleteArtworkList()

  const { sendToast } = useToasts()

  const trackAnalyticEvent = () => {
    const event: DeletedArtworkList = {
      action: ActionType.deletedArtworkList,
      context_owner_type: OwnerType.saves,
      owner_id: artworkList.internalID,
    }

    trackEvent(event)
  }

  const handleDeletePress = async () => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: artworkList.internalID,
          },
        },
        rejectIf: res => {
          const result = res.deleteCollection?.responseOrError

          return result?.__typename === "DeleteCollectionFailure"
            ? result.mutationError
            : false
        },
      })

      sendToast({
        variant: "success",
        message: "Changes saved",
      })

      trackAnalyticEvent()
      router.replace(BASE_SAVES_PATH)
    } catch (err) {
      console.error(err)
      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong",
      })
    } finally {
      onClose()
    }
  }

  return (
    <ModalDialog
      title={`Delete ${artworkList.name} list?`}
      onClose={onClose}
      footer={
        <Flex
          justifyContent={"space-between"}
          flexDirection={["column-reverse", "row"]}
        >
          <Button variant="secondaryBlack" onClick={onClose}>
            Cancel
          </Button>

          <Button mb={[1, 0]} onClick={handleDeletePress}>
            Yes, Delete List
          </Button>
        </Flex>
      }
      width={["100%", 700]}
    >
      <Text>You’ll lose any works that are only saved on this list.</Text>
    </ModalDialog>
  )
}
