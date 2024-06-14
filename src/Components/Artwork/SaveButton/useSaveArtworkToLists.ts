import { AuthContextModule, Intent } from "@artsy/cohesion"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"

type Artwork = {
  internalID: string
  id: string
  slug: string
  title: string
  year: string | null | undefined
  artistNames: string | null | undefined
  imageURL: string | null
  isSavedToDefaultList: boolean
  isSavedToCustomLists: boolean
}

export interface SaveArtworkToListsOptions {
  artwork: Artwork
  contextModule: AuthContextModule
}

export enum ResultAction {
  SavedToDefaultList,
  RemovedFromDefaultList,
  SelectingListsForArtwork,
  ShowingAuthDialog,
}

export const useSaveArtworkToLists = (options: SaveArtworkToListsOptions) => {
  const { artwork, contextModule } = options
  const { showAuthDialog: _showAuthDialog } = useAuthDialog()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { savedListId, dispatch } = useManageArtworkForSavesContext()

  const isSaved = artwork.isSavedToCustomLists || artwork.isSavedToDefaultList

  const showAuthDialog = () => {
    _showAuthDialog({
      mode: "SignUp",
      options: {
        title: mode => {
          const action = mode === "SignUp" ? "Sign up" : "Log in"
          return `${action} to save artworks`
        },
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

  const saveToDefaultList = () => {
    if (!relayEnvironment) {
      return
    }

    // TODO: Use `useMutation` in the future
    return SaveArtwork(
      relayEnvironment,
      { artworkID: artwork.internalID, remove: artwork.isSavedToDefaultList },
      {
        saveArtwork: {
          artwork: {
            id: artwork.id,
            slug: artwork.slug,
            isSaved: !artwork.isSavedToDefaultList,
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
      }
    )
  }

  const saveArtworkToLists = async () => {
    if (!isLoggedIn) {
      showAuthDialog()
      return ResultAction.ShowingAuthDialog
    }

    if (savedListId || artwork.isSavedToCustomLists) {
      openSelectListsForArtworkModal()
      return ResultAction.SelectingListsForArtwork
    }

    const response = await saveToDefaultList()
    const isSaved = response?.saveArtwork?.artwork?.isSaved

    return isSaved
      ? ResultAction.SavedToDefaultList
      : ResultAction.RemovedFromDefaultList
  }

  return {
    isSaved,
    openSelectListsForArtworkModal,
    saveArtworkToLists,
  }
}
