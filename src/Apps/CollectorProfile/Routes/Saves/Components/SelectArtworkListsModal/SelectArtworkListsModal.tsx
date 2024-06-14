import React, { FC, useState } from "react"
import { ModalDialog, useToasts } from "@artsy/palette"
import { SelectArtworkListsHeader } from "./SelectArtworkListsHeader"
import { SelectArtworkListsFooter } from "./SelectArtworkListsFooter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectArtworkListsModal_me$data } from "__generated__/SelectArtworkListsModal_me.graphql"
import { SelectArtworkListsModalQuery } from "__generated__/SelectArtworkListsModalQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { getSelectedArtworkListIds } from "Apps/CollectorProfile/Routes/Saves/Utils/getSelectedArtworkListIds"
import { useSelectArtworkLists } from "./useSelectArtworkLists"
import createLogger from "Utils/logger"
import { useTranslation } from "react-i18next"
import { SelectArtworkListsContent } from "./SelectArtworkListsContent"
import {
  ListKey,
  OnSaveResultData,
  ResultListEntity,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { ActionType, AddedArtworkToArtworkList } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"

const logger = createLogger("SelectArtworkListsModal")

export interface SelectArtworkListsModalProps {
  me: SelectArtworkListsModal_me$data | null | undefined
}

type ArtworkListById = Record<string, ResultListEntity>

export const SelectArtworkListsModal: React.FC<SelectArtworkListsModalProps> = ({
  me,
}) => {
  const { t } = useTranslation()
  const { state, dispatch, reset, onSave } = useManageArtworkForSavesContext()
  const analytics = useAnalyticsContext()
  const { trackEvent } = useTracking()
  const [isSaving, setIsSaving] = useState(false)
  const savedArtworksArtworkList = me?.savedArtworksArtworkList
  const customArtworkLists = extractNodes(me?.customArtworkLists)
  const artworkLists = savedArtworksArtworkList
    ? [savedArtworksArtworkList, ...customArtworkLists]
    : customArtworkLists
  const selectedArtworkListIds = getSelectedArtworkListIds({
    artworkLists,
    addToArtworkListIDs: state.addingListIDs,
    removeFromArtworkListIDs: state.removingListIDs,
  })
  const hasChanges =
    state.addingListIDs.length !== 0 || state.removingListIDs.length !== 0

  const { submitMutation } = useSelectArtworkLists(state.artwork?.id as string)
  const { sendToast } = useToasts()

  const onClose = () => {
    reset()
  }

  const getArtworkListsById = () => {
    const artworkListById: ArtworkListById = {}

    artworkLists.forEach(artworkList => {
      artworkListById[artworkList.internalID] = {
        id: artworkList.internalID,
        name: artworkList.name,
      }
    })

    return artworkListById
  }

  const getOnSaveResult = (): OnSaveResultData => {
    const artworkListById = getArtworkListsById()
    const selectedLists = getResultEntitiesByIds(
      selectedArtworkListIds,
      artworkListById
    )
    const addedLists = getResultEntitiesByIds(
      state.addingListIDs,
      artworkListById
    )
    const removedLists = getResultEntitiesByIds(
      state.removingListIDs,
      artworkListById
    )

    return {
      selectedLists,
      addedLists,
      removedLists,
    }
  }

  const handleArtworkListPress = (artworkList: typeof artworkLists[0]) => {
    dispatch({
      type: "ADD_OR_REMOVE_LIST_ID",
      payload: {
        listID: artworkList.internalID,
        listKey: artworkList.isSavedArtwork
          ? ListKey.RemovingListIDs
          : ListKey.AddingListIDs,
      },
    })
  }

  const trackAddedArtworkToArtworkLists = () => {
    const event: AddedArtworkToArtworkList = {
      action: ActionType.addedArtworkToArtworkList,
      context_owner_id: analytics.contextPageOwnerId,
      context_owner_slug: analytics.contextPageOwnerSlug,
      context_owner_type: analytics.contextPageOwnerType,
      artwork_ids: [state.artwork?.internalID as string],
      owner_ids: state.addingListIDs,
    }

    trackEvent(event)
  }

  const handleSaveClicked = async () => {
    try {
      setIsSaving(true)

      await submitMutation({
        variables: {
          input: {
            artworkIDs: [state.artwork?.internalID as string],
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

      if (state.addingListIDs.length > 0) {
        trackAddedArtworkToArtworkLists()
      }

      const result = getOnSaveResult()
      onSave(result)
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

  const checkIsArtworkListSelected = (artworkList: typeof artworkLists[0]) => {
    /**
     * User added artwork to the previously unselected artwork list
     * So we have to display the artwork list as *selected*
     */
    if (state.addingListIDs.includes(artworkList.internalID)) {
      return true
    }

    /**
     * User deleted artwork from the previously selected artwork list
     * So we have to display the artwork list as *unselected*
     */
    if (state.removingListIDs.includes(artworkList.internalID)) {
      return false
    }

    return artworkList.isSavedArtwork
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
      header={<SelectArtworkListsHeader />}
      footer={
        <SelectArtworkListsFooter
          selectedArtworkListsCount={selectedArtworkListIds.length}
          hasChanges={hasChanges}
          onSaveClick={handleSaveClicked}
          isSaving={isSaving}
        />
      }
    >
      <SelectArtworkListsContent
        isFetching={me === null}
        artworkLists={artworkLists}
        checkIsArtworkListSelected={checkIsArtworkListSelected}
        onArtworkListPress={handleArtworkListPress}
      />
    </ModalDialog>
  )
}

export const SelectArtworkListsModalFragmentContainer = createFragmentContainer(
  SelectArtworkListsModal,
  {
    me: graphql`
      fragment SelectArtworkListsModal_me on Me
        @argumentDefinitions(artworkID: { type: "String!" }) {
        savedArtworksArtworkList: collection(id: "saved-artwork") {
          internalID
          isSavedArtwork(artworkID: $artworkID)
          name
          ...SelectArtworkListItem_item
        }

        customArtworkLists: collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: UPDATED_AT_DESC
        ) {
          edges {
            node {
              internalID
              isSavedArtwork(artworkID: $artworkID)
              name
              ...SelectArtworkListItem_item
            }
          }
        }
      }
    `,
  }
)

export const SelectArtworkListsModalQueryRender: FC = () => {
  const { state } = useManageArtworkForSavesContext()

  return (
    <SystemQueryRenderer<SelectArtworkListsModalQuery>
      query={query}
      variables={{ artworkID: state.artwork?.internalID as string }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SelectArtworkListsModalFragmentContainer me={props?.me ?? null} />
        )
      }}
    />
  )
}

const query = graphql`
  query SelectArtworkListsModalQuery($artworkID: String!) {
    me {
      ...SelectArtworkListsModal_me @arguments(artworkID: $artworkID)
    }
  }
`

const getResultEntitiesByIds = (
  ids: string[],
  artworkListById: ArtworkListById
) => {
  return ids.map(id => artworkListById[id])
}
