import React, { FC, useState } from "react"
import { Box, ModalDialog, useToasts } from "@artsy/palette"
import { SelectArtworkListsHeader } from "./SelectArtworkListsHeader"
import { SelectArtworkListsFooter } from "./SelectArtworkListsFooter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkModal_me$data } from "__generated__/SelectListsForArtworkModal_me.graphql"
import { SelectListsForArtworkModalQuery } from "__generated__/SelectListsForArtworkModalQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { getSelectedArtworkListIds } from "Apps/CollectorProfile/Routes/Saves2/Utils/getSelectedArtworkListIds"
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
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useTracking } from "react-tracking"

const logger = createLogger("SelectListsForArtworkModal")

export interface SelectListsForArtworkModalProps {
  me: SelectListsForArtworkModal_me$data | null
}

type ArtworkListById = Record<string, ResultListEntity>

export const SelectListsForArtworkModal: React.FC<SelectListsForArtworkModalProps> = ({
  me,
}) => {
  const { t } = useTranslation()
  const { state, dispatch, reset, onSave } = useManageArtworkForSavesContext()
  const analytics = useAnalyticsContext()
  const { trackEvent } = useTracking()
  const [isSaving, setIsSaving] = useState(false)
  const allSavesArtworkList = me?.allSavesArtworkList
  const customArtworkLists = extractNodes(me?.customArtworkLists)
  const artworkLists = allSavesArtworkList
    ? [allSavesArtworkList, ...customArtworkLists]
    : customArtworkLists
  const selectedArtworkListIds = getSelectedArtworkListIds({
    artworkLists,
    addToArtworkListIDs: state.addingListIDs,
    removeFromArtowrkListIDs: state.removingListIDs,
  })
  const hasChanges =
    state.addingListIDs.length !== 0 || state.removingListIDs.length !== 0

  const { submitMutation } = useSelectArtworkLists(state.artwork!.id)
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
      context_owner_type: analytics.contextPageOwnerType!,
      artwork_ids: [state.artwork!.internalID],
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
            artworkIDs: [state.artwork!.internalID],
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
      m={0}
      header={
        <Box mt={[-2, 0]} mb={-2}>
          <SelectArtworkListsHeader />
        </Box>
      }
      footer={
        <SelectArtworkListsFooter
          selectedArtworkListsCount={selectedArtworkListIds.length}
          hasChanges={hasChanges}
          onSaveClick={handleSaveClicked}
          isSaving={isSaving}
        />
      }
    >
      <Box mt={1}>
        <SelectArtworkListsContent
          isFetching={me === null}
          artworkLists={artworkLists}
          checkIsArtworkListSelected={checkIsArtworkListSelected}
          onArtworkListPress={handleArtworkListPress}
        />
      </Box>
    </ModalDialog>
  )
}

export const SelectListsForArtworkModalFragmentContainer = createFragmentContainer(
  SelectListsForArtworkModal,
  {
    me: graphql`
      fragment SelectListsForArtworkModal_me on Me
        @argumentDefinitions(artworkID: { type: "String!" }) {
        allSavesArtworkList: collection(id: "saved-artwork") {
          internalID
          isSavedArtwork(artworkID: $artworkID)
          name
          ...SelectArtworkListItem_item
        }

        customArtworkLists: collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: CREATED_AT_DESC
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

export const SelectListsForArtworkModalQueryRender: FC = () => {
  const { state } = useManageArtworkForSavesContext()

  return (
    <SystemQueryRenderer<SelectListsForArtworkModalQuery>
      query={query}
      variables={{ artworkID: state.artwork!.internalID }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SelectListsForArtworkModalFragmentContainer me={props?.me ?? null} />
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
  }
`

const getResultEntitiesByIds = (
  ids: string[],
  artworkListById: ArtworkListById
) => {
  return ids.map(id => artworkListById[id])
}
