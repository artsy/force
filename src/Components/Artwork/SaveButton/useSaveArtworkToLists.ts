import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { type AuthContextModule, Intent } from "@artsy/cohesion"
import type { useSaveArtworkToListsArtworkListInclusionQuery } from "__generated__/useSaveArtworkToListsArtworkListInclusionQuery.graphql"
import { fetchQuery, graphql } from "react-relay"

type Artwork = {
  internalID: string
  id: string
  slug: string
  title: string
  year: string | null | undefined
  artistNames: string | null | undefined
  imageURL: string | null
  isInAuction: boolean
  isSavedToAnyList: boolean
  collectorSignals: {
    auction: {
      lotWatcherCount: number
    } | null
  } | null
}

export interface SaveArtworkToListsOptions {
  artwork: Artwork
  contextModule: AuthContextModule
}

export enum ResultAction {
  SavedToDefaultList = 0,
  RemovedFromDefaultList = 1,
  SelectingListsForArtwork = 2,
  ShowingAuthDialog = 3,
}

export const useSaveArtworkToLists = (options: SaveArtworkToListsOptions) => {
  const { artwork, contextModule } = options
  const { showAuthDialog: _showAuthDialog } = useAuthDialog()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { dispatch } = useManageArtworkForSavesContext()

  const showAuthDialog = () => {
    _showAuthDialog({
      options: {
        title: "Sign up or log in to save artworks",
        afterAuthAction: {
          action: "saveArtworkToLists",
          kind: "artworks",
          objectId: artwork.internalID,
        },
      },
      analytics: {
        intent: Intent.saveArtwork,
        contextModule,
      },
    })
  }

  const openSelectListsForArtworkModal = () => {
    dispatch({
      type: "SET_ARTWORK",
      payload: {
        id: artwork.id,
        internalID: artwork.internalID,
        title: artwork.title,
        year: artwork.year as string,
        artistNames: artwork.artistNames as string,
        imageURL: artwork.imageURL,
      },
    })
  }

  const saveToDefaultList = (remove: boolean) => {
    if (!relayEnvironment) {
      return
    }

    // TODO: Use `useMutation` in the future
    return SaveArtwork(
      relayEnvironment,
      { artworkID: artwork.internalID, remove },
      {
        saveArtwork: {
          artwork: {
            id: artwork.id,
            slug: artwork.slug,
            isSavedToAnyList: !remove,
            collectorSignals: artwork.collectorSignals ?? null,
          },
          /**
           * TODO: We don't _really_ need an optimistic response and
           * it's too painful to alter all the consumers of this to pass
           * in the `me` object.
           *
           * This hook shouldn't have to accept a stub `artwork` object either.
           * Given just the artwork `id` we could fetch everything else.
           */
          me: {
            id: "me",
            counts: {
              savedArtworks: 0,
            },
          },
        },
      },
    )
  }

  const saveArtworkToLists = async () => {
    if (!isLoggedIn) {
      showAuthDialog()
      return ResultAction.ShowingAuthDialog
    }

    if (!artwork.isSavedToAnyList) {
      // We are saving an unsaved artwork, so we should save it to the default list
      await saveToDefaultList(false)
      return ResultAction.SavedToDefaultList
    } else {
      // We are unsaving an artwork, so first let's check if it's saved to any custom lists.
      // If so, we want to open the modal.
      // Else, we can unsave it from the default list.
      const data =
        await fetchQuery<useSaveArtworkToListsArtworkListInclusionQuery>(
          relayEnvironment,
          graphql`
            query useSaveArtworkToListsArtworkListInclusionQuery(
              $artworkID: String!
            ) {
              artwork(id: $artworkID) {
                isSavedToList(default: false)
              }
            }
          `,
          { artworkID: artwork.internalID },
        ).toPromise()

      if (data?.artwork?.isSavedToList) {
        openSelectListsForArtworkModal()
        return ResultAction.SelectingListsForArtwork
      } else {
        await saveToDefaultList(true)
        return ResultAction.RemovedFromDefaultList
      }
    }
  }

  return {
    openSelectListsForArtworkModal,
    saveArtworkToLists,
  }
}
