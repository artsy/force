import { Button, Flex, ModalDialog, Text, useToasts } from "@artsy/palette"
import { useDeleteArtworkList } from "./Mutations/useDeleteArtworkList"
import { useTranslation } from "react-i18next"
import { useRouter } from "System/Hooks/useRouter"
import { useTracking } from "react-tracking"
import { ActionType, DeletedArtworkList, OwnerType } from "@artsy/cohesion"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"

export interface DeleteArtworkListEntity {
  internalID: string
  name: string
}

interface Props {
  artworkList: DeleteArtworkListEntity
  onClose: () => void
}

export const DeleteArtworkListModal: React.FC<Props> = ({
  artworkList,
  onClose,
}) => {
  const { t } = useTranslation()
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
        message: t("collectorSaves.deleteListModal.success"),
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
      title={t("collectorSaves.deleteListModal.title", {
        name: artworkList.name,
      })}
      onClose={onClose}
      footer={
        <Flex
          justifyContent={"space-between"}
          flexDirection={["column-reverse", "row"]}
        >
          <Button variant="secondaryBlack" onClick={onClose}>
            {t("common.buttons.cancel")}
          </Button>

          <Button mb={[1, 0]} onClick={handleDeletePress}>
            {t("collectorSaves.deleteListModal.delete")}
          </Button>
        </Flex>
      }
      width={["100%", 700]}
    >
      <Text>{t("collectorSaves.deleteListModal.message")}</Text>
    </ModalDialog>
  )
}
