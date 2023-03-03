import { Button, Flex, ModalDialog, Text, useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { DeleteSavesModalMutation } from "__generated__/DeleteSavesModalMutation.graphql"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

interface Props {
  collection: SavesArtworks_collection$data
  onClose: () => void
}

export const DeleteSavesModal: React.FC<Props> = ({ collection, onClose }) => {
  const { t } = useTranslation()

  const { submitMutation } = useMutation<DeleteSavesModalMutation>({
    mutation: graphql`
      mutation DeleteSavesModalMutation($input: deleteCollectionInput!) {
        deleteCollection(input: $input) {
          responseOrError {
            __typename # DeleteCollectionSuccess or DeleteCollectionFailure
            ... on DeleteCollectionFailure {
              mutationError {
                message
                statusCode
              }
            }
          }
        }
      }
    `,
  })

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
            {t("collectorSaves.deleteListModal.cancel")}
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
