import React, { FC, useState } from "react"
import { Spacer, Join, ModalDialog, Box, useToasts } from "@artsy/palette"
import { SelectListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItem"
import { SelectListsForArtworkHeaderFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkHeader"
import { SelectListsForArtworkFooter } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkFooter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkModal_me$data } from "__generated__/SelectListsForArtworkModal_me.graphql"
import { SelectListsForArtworkModal_artwork$data } from "__generated__/SelectListsForArtworkModal_artwork.graphql"
import { SelectListsForArtworkModalQuery } from "__generated__/SelectListsForArtworkModalQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  SelectListsForArtworkHeaderPlaceholder,
  SelectListsPlaceholder,
} from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkPlaceholders"
import { getSelectedCollectionIds } from "Apps/CollectorProfile/Routes/Saves2/Utils/getSelectedCollectionIds"
import { useUpdateCollectionsForArtwork } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/useUpdateCollectionsForArtwork"
import createLogger from "Utils/logger"
import { useTranslation } from "react-i18next"

const logger = createLogger("SelectListsForArtworkModal")

interface SelectListsForArtworkModalQueryRenderProps {
  artworkID: string
  onClose: () => void
}

export interface SelectListsForArtworkModalProps {
  me: SelectListsForArtworkModal_me$data | null
  artwork: SelectListsForArtworkModal_artwork$data | null
  onClose: () => void
}

export const SelectListsForArtworkModal: React.FC<SelectListsForArtworkModalProps> = ({
  me,
  artwork,
  onClose,
}) => {
  const { t } = useTranslation()
  const [addToCollectionIDs, setAddToCollectionIDs] = useState<string[]>([])
  const [removeFromCollectionIDs, setRemoveFromCollectionIDs] = useState<
    string[]
  >([])
  const savedCollection = me?.defaultSaves
  const nodes = extractNodes(me?.collectionsConnection)
  const collections = savedCollection ? [savedCollection, ...nodes] : nodes
  const selectedCollectionIds = getSelectedCollectionIds({
    collections,
    addToCollectionIDs,
    removeFromCollectionIDs,
  })
  const hasChanges =
    addToCollectionIDs.length !== 0 || removeFromCollectionIDs.length !== 0

  const { submitMutation } = useUpdateCollectionsForArtwork()
  const { sendToast } = useToasts()

  const addOrRemoveCollectionIdFromIds = (
    ids: string[],
    collectionId: string
  ) => {
    if (ids.includes(collectionId)) {
      return ids.filter(id => id !== collectionId)
    }

    return [...ids, collectionId]
  }

  const handleItemPress = (item: typeof collections[0]) => {
    if (item.isSavedArtwork) {
      const updatedIds = addOrRemoveCollectionIdFromIds(
        removeFromCollectionIDs,
        item.internalID
      )

      setRemoveFromCollectionIDs(updatedIds)
      return
    }

    const updatedIds = addOrRemoveCollectionIdFromIds(
      addToCollectionIDs,
      item.internalID
    )
    setAddToCollectionIDs(updatedIds)
  }

  const handleSaveClicked = async () => {
    try {
      const { artworksCollectionsBatchUpdate } = await submitMutation({
        variables: {
          input: {
            artworkIDs: [artwork!.internalID],
            addToCollectionIDs,
            removeFromCollectionIDs,
          },
        },
        rejectIf: res => {
          const result = res.artworksCollectionsBatchUpdate
          const error = result?.responseOrError

          return !!error?.mutationError
        },
      })

      const response = artworksCollectionsBatchUpdate?.responseOrError
      const counts = response?.counts

      sendToast({
        variant: "success",
        message: `added: ${counts?.addedToCollections}, removed: ${counts?.removedFromCollections}`,
      })
    } catch (error) {
      logger.error(error)

      sendToast({
        variant: "error",
        message: t("common.errors.somethingWentWrong"),
      })
    } finally {
      onClose()
    }
  }

  const checkIsItemSelected = (item: typeof collections[0]) => {
    /**
     * User added artwork to the previously unselected collection
     * So we have to display the collection as *selected*
     */
    if (addToCollectionIDs.includes(item.internalID)) {
      return true
    }

    /**
     * User deleted artwork from the previously selected collection
     * So we have to display the collection as *unselected*
     */
    if (removeFromCollectionIDs.includes(item.internalID)) {
      return false
    }

    return item.isSavedArtwork
  }

  const renderContent = () => {
    // Query is in progress
    if (me === null) {
      return <SelectListsPlaceholder />
    }

    return (
      <Box role="listbox">
        <Join separator={<Spacer y={1} />}>
          {collections.map(item => {
            return (
              <SelectListItemFragmentContainer
                item={item}
                isSelected={checkIsItemSelected(item)}
                onClick={() => handleItemPress(item)}
              />
            )
          })}
        </Join>
      </Box>
    )
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
        />
      }
    >
      {renderContent()}
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

export const SelectListsForArtworkModalQueryRender: FC<SelectListsForArtworkModalQueryRenderProps> = ({
  artworkID,
  ...rest
}) => {
  return (
    <SystemQueryRenderer<SelectListsForArtworkModalQuery>
      query={query}
      variables={{ artworkID }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SelectListsForArtworkModalFragmentContainer
            me={props?.me ?? null}
            artwork={props?.artwork ?? null}
            {...rest}
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
