import { Button, Flex, ModalDialog, Text, useToasts } from "@artsy/palette"
import { useDeleteCollection } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/Mutations/useDeleteCollection"
import { useTranslation } from "react-i18next"
import { useRouter } from "System/Router/useRouter"

export interface DeleteSavesModalCollection {
  internalID: string
  name: string
}

interface Props {
  collection: DeleteSavesModalCollection
  onClose: () => void
}

export const DeleteSavesModal: React.FC<Props> = ({ collection, onClose }) => {
  const { t } = useTranslation()
  const { router } = useRouter()

  const { submitMutation } = useDeleteCollection()

  const { sendToast } = useToasts()

  const handleDeletePress = async () => {
    try {
      await submitMutation({
        variables: {
          input: {
            id: collection.internalID,
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

      router.replace("/collector-profile/saves2")
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
        name: collection.name,
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
      width={[
        "100%",
        753, // vs. 713px for create and edit modals and 673px for manage-artworks modal -- should be consistent (700?) or maybe just "auto"?
      ]}
    >
      <Text>{t("collectorSaves.deleteListModal.message")}</Text>
    </ModalDialog>
  )
}
