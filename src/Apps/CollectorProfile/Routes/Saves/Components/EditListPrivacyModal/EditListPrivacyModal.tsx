import { Button, ModalDialog } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { useTranslation } from "react-i18next"
import { EditArtworkListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditArtworkListItem"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"

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
  const savedArtworksArtworkList = me?.savedArtworksArtworkList
  const artworkLists = savedArtworksArtworkList
    ? [savedArtworksArtworkList, ...customArtworkLists]
    : customArtworkLists

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
      {artworkLists.map(list => {
        return (
          <EditArtworkListItemFragmentContainer
            key={list.internalID}
            item={list}
          />
        )
      })}
      <Button onClick={onComplete}>Save Changes</Button>
    </ModalDialog>
  )
}

// export const EditListPrivacyFragmentContainer = createFragmentContainer(
//   EditListPrivacyModal,
//   {
//     me: graphql`
//       fragment EditListPrivacyModal_me on Me {
//         savedArtworksArtworkList: collection(id: "saved-artwork") {
//           internalID
//           ...EditArtworkListItem_item
//         }

//         customArtworkLists: collectionsConnection(
//           first: 30
//           default: false
//           saves: true
//           sort: CREATED_AT_DESC
//         )
//           @connection(
//             key: "CollectorProfileSavesRoute_customArtworkLists"
//             filters: []
//           ) {
//           edges {
//             node {
//               internalID
//               ...EditArtworkListItem_item
//             }
//           }
//         }
//       }
//     `,
//   }
// )
