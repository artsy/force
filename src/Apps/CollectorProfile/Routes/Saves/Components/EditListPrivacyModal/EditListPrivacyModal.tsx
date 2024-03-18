import { Button, ModalDialog } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"

export interface Lists {
  internalID: string
  name: string
}

interface EditListPrivacyModalProps {
  onClose: () => void
  onComplete: () => void
  me: CollectorProfileSavesRoute_me$data
}

export const EditListPrivacyModal: React.FC<EditListPrivacyModalProps> = ({
  onClose,
  onComplete,
  me,
}) => {
  const { t } = useTranslation()
  const customArtworkLists = extractNodes(me.customArtworkLists)

  const handleSubmit = async () => {
    //handle submit
  }

  return (
    <ModalDialog
      width={["100%", 713]}
      onClose={onClose}
      title={t("collectorSaves.editListPrivacyModal.title")}
      data-testid="CreateNewList"
    >
      {customArtworkLists.map(artworkList => {
        return "Test"
        // <ArtworkListItemFragmentContainer
        //   key={artworkList.internalID}
        //   item={artworkList}
        //   isSelected={artworkList.internalID === selectedArtworkListId}
        //   imagesLayout={isDefaultArtworkList ? "grid" : "stacked"}
        // />
      })}
      <Button onClick={onComplete}>Save Changes</Button>
    </ModalDialog>
  )
}

export const EditListPrivacyFragmentContainer = createFragmentContainer(
  EditListPrivacyModal,
  {
    me: graphql`
      fragment EditListPrivacyModal_me on Me {
        customArtworkLists: collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: CREATED_AT_DESC
        )
          @connection(
            key: "CollectorProfileSavesRoute_customArtworkLists"
            filters: []
          ) {
          edges {
            node {
              internalID
              default
              ...ArtworkListItem_item
            }
          }
        }
      }
    `,
  }
)
