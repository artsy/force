import React, { FC, useState } from "react"
import { ModalDialog, useToasts } from "@artsy/palette"
import { SelectListsForArtworkHeaderFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkHeader"
import { SelectListsForArtworkFooter } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkFooter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkModal_me$data } from "__generated__/SelectListsForArtworkModal_me.graphql"
import { SelectListsForArtworkModal_artwork$data } from "__generated__/SelectListsForArtworkModal_artwork.graphql"
import { SelectListsForArtworkModalQuery } from "__generated__/SelectListsForArtworkModalQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { SelectListsForArtworkHeaderPlaceholder } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkPlaceholders"
import { getSelectedCollectionIds } from "Apps/CollectorProfile/Routes/Saves2/Utils/getSelectedCollectionIds"
import { useUpdateCollectionsForArtwork } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/useUpdateCollectionsForArtwork"
import createLogger from "Utils/logger"
import { useTranslation } from "react-i18next"
import { SelectListsForArtworkContent } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkContent"
import {
  ListKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"

const logger = createLogger("SelectListsForArtworkModal")

export interface SelectListsForArtworkModalProps {
  me: SelectListsForArtworkModal_me$data | null
  artwork: SelectListsForArtworkModal_artwork$data | null
}

export const SelectListsForArtworkModal: React.FC<SelectListsForArtworkModalProps> = ({
  me,
  artwork,
}) => {
  const { t } = useTranslation()
  const { state, dispatch, onSave } = useManageArtworkForSavesContext()
  const [isSaving, setIsSaving] = useState(false)
  const savedCollection = me?.defaultSaves
  const nodes = extractNodes(me?.collectionsConnection)
  const collections = savedCollection ? [savedCollection, ...nodes] : nodes
  const selectedCollectionIds = getSelectedCollectionIds({
    collections,
    addToCollectionIDs: state.addingListIDs,
    removeFromCollectionIDs: state.removingListIDs,
  })
  const hasChanges =
    state.addingListIDs.length !== 0 || state.removingListIDs.length !== 0

  const { submitMutation } = useUpdateCollectionsForArtwork()
  const { sendToast } = useToasts()

  const onClose = () => {
    dispatch({
      type: "SET_ARTWORK_ID",
      payload: null,
    })
  }

  const handleItemPress = (item: typeof collections[0]) => {
    dispatch({
      type: "ADD_OR_REMOVE_LIST_ID",
      payload: {
        listID: item.internalID,
        listKey: item.isSavedArtwork
          ? ListKey.RemovingListIDs
          : ListKey.AddingListIDs,
      },
    })
  }

  const handleSaveClicked = async () => {
    try {
      const artworkId = artwork!.internalID

      setIsSaving(true)

      await submitMutation({
        variables: {
          input: {
            artworkIDs: [artworkId],
            addToCollectionIDs: state.addingListIDs,
            removeFromCollectionIDs: state.removingListIDs,
          },
        },
        rejectIf: res => {
          const result = res.artworksCollectionsBatchUpdate
          const error = result?.responseOrError

          return !!error?.mutationError
        },
      })

      onSave(selectedCollectionIds)
    } catch (error) {
      logger.error(error)

      sendToast({
        variant: "error",
        message: t("common.errors.somethingWentWrong"),
      })
    } finally {
      setIsSaving(false)
      onClose()
    }
  }

  const checkIsItemSelected = (item: typeof collections[0]) => {
    /**
     * User added artwork to the previously unselected collection
     * So we have to display the collection as *selected*
     */
    if (state.addingListIDs.includes(item.internalID)) {
      return true
    }

    /**
     * User deleted artwork from the previously selected collection
     * So we have to display the collection as *unselected*
     */
    if (state.removingListIDs.includes(item.internalID)) {
      return false
    }

    return item.isSavedArtwork
  }

  return (
    <ModalDialog
      title="Select lists for this artwork"
      onClose={onClose}
      onClick={event => {
        event.preventDefault()
      }}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      m={0}
      header={
        artwork === null ? (
          <SelectListsForArtworkHeaderPlaceholder />
        ) : (
          <SelectListsForArtworkHeaderFragmentContainer artwork={artwork} />
        )
      }
      footer={
        <SelectListsForArtworkFooter
          selectedListsCount={selectedCollectionIds.length}
          hasChanges={hasChanges}
          onSaveClick={handleSaveClicked}
          isSaving={isSaving}
        />
      }
    >
      <SelectListsForArtworkContent
        isFetching={me === null}
        collections={collections}
        checkIsItemSelected={checkIsItemSelected}
        onItemPress={handleItemPress}
      />
    </ModalDialog>
  )
}

export const SelectListsForArtworkModalFragmentContainer = createFragmentContainer(
  SelectListsForArtworkModal,
  {
    me: graphql`
      fragment SelectListsForArtworkModal_me on Me
        @argumentDefinitions(artworkID: { type: "String!" }) {
        defaultSaves: collection(id: "saved-artwork") {
          internalID
          isSavedArtwork(artworkID: $artworkID)
          ...SelectListItem_item
        }

        collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: CREATED_AT_DESC
        ) {
          edges {
            node {
              internalID
              isSavedArtwork(artworkID: $artworkID)
              ...SelectListItem_item
            }
          }
        }
      }
    `,
    artwork: graphql`
      fragment SelectListsForArtworkModal_artwork on Artwork {
        internalID
        ...SelectListsForArtworkHeader_artwork
      }
    `,
  }
)

export const SelectListsForArtworkModalQueryRender: FC = () => {
  const { state } = useManageArtworkForSavesContext()

  return (
    <SystemQueryRenderer<SelectListsForArtworkModalQuery>
      query={query}
      variables={{ artworkID: state.artworkId! }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SelectListsForArtworkModalFragmentContainer
            me={props?.me ?? null}
            artwork={props?.artwork ?? null}
          />
        )
      }}
    />
  )
}

const query = graphql`
  query SelectListsForArtworkModalQuery($artworkID: String!) {
    me {
      ...SelectListsForArtworkModal_me @arguments(artworkID: $artworkID)
    }
    artwork(id: $artworkID) {
      ...SelectListsForArtworkModal_artwork
    }
  }
`
